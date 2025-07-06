import express from "express";
import { sql } from "../config/db.js";

const router = express.Router();

router.post("/", async(req,res) => {
    try {
        const { user_id, name, base_price } = req.body; // add something for error handling

        const product = await sql`
            INSERT INTO products(user_id, name, base_price)
            VALUES (${user_id}, ${name}, ${base_price})
            RETURNING *
        `;
        console.log("Product added successfully");
    } catch(error) {    
        console.log("Post method for products error");
    }
});

export default router;