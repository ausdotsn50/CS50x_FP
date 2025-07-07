import express from "express";
import { sql } from "../config/db.js";

const router = express.Router();

// Route: /api/orders
router.get("/", async(req,res) => {
    try {
        const overview = await sql`
            SELECT customers.name, address, products.item, base_price, quantity, type FROM orders
            JOIN customers ON orders.customer_id = customers.id
            JOIN products ON orders.product_id = products.id
            WHERE customer_id = 1
        `;
        
        // Overview as a dict
        console.log(overview);
        console.log("Here are the orders made by our customer:", overview[0].name, "from address: ", overview[0].address);
        
        let total = 0;
        for (let i = 0; i < overview.length; i++) {
            console.log("Item #", i + 1, " ", overview[i].item);
            
            let actual_price;
            if (overview[i].type === "deliver") {
                actual_price = parseFloat(overview[i].base_price) + 5.00;
            }
            else {
                actual_price = overview[i].base_price;
            }

            let amt_to_pay = overview[i].quantity * actual_price;
            console.log("Amount to pay: ", amt_to_pay);
            total += amt_to_pay;
        }
        console.log("Total amount owed by ", overview[0].name, ":", total);


    } catch(error) {
        console.log("Some error")
    }
});

router.post("/", async(req,res) => {
    // get the fields that user wants to send
    try {
        // id here is for sale.identification
        const { product_id, customer_id, quantity, type } = req.body;

        if(!product_id || !customer_id || !quantity || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const order = await sql`
            INSERT INTO orders(product_id, customer_id, quantity, type)
            VALUES (${product_id}, ${customer_id}, ${quantity}, ${type})
            RETURNING *
        `;
        console.log(order);
        res.status(201).json(order[0]);
    } catch(error) {
        // error posting a sale
        // server side error
        console.log("Error creating the transaction", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;