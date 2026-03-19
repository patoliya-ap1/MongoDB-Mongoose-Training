import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./db/config/db.connect";
import { mainRouter } from "./routes/index-routes";

dotenv.config();
const app = express();

// database connection
initializeDatabase();

// parse req body
app.use(express.json());

// main routes
app.use(mainRouter);

// server listening
app.listen(3000, () => console.log("Server running on port 3000"));
