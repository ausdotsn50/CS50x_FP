import express from "express";
import dotenv from "dotenv";
import route from "./routes/route.js";
import { sql } from "./config/db.js"

dotenv.config();

const app = express(); // Initializing an ExpressJS app
app.use(express.json()); // A built-in middleware

const PORT = process.env.PORT || 5001; // Default port: 5001

// Initializing the database
/* Key words: 
        NOT EXIST
        SERIAL pseudo-type simplifies generating auto-incrementing sequences for columns
        DATE NOT NUL DEFAULT CURRENT_DATE
*/
async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            base_price DECIMAL(10,2) NOT NULL
        )`;

        await sql`CREATE TABLE IF NOT EXISTS customers(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL
        )`;

        await sql `CREATE TABLE IF NOT EXISTS orders(
            id SERIAL PRIMARY KEY,
            product_id INT NOT NULL REFERENCES products(id),
            customer_id INT NOT NULL REFERENCES customers(id),
            type VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database initialized succesfully");
    } catch(error) {
        console.log("Error initializing database", error);
        process.exit(1);
    }
}

// add connection with the routes
app.use("/api/sales", route);

// listening for incoming req on a specific port
initDB().then(() => {
    // port listen only after initializing database
    app.listen(PORT, () =>  {
        console.log("Server is up and running on PORT: ", PORT);
    });
});
