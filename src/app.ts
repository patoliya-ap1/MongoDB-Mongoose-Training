import express from "express";

import dotenv from "dotenv";
import { StudentModel } from "./models/Student";
import { initializeDatabase } from "./db/config/db.connect";
import { mainRouter } from "./routes/index-routes";

dotenv.config();
const app = express();

initializeDatabase();

// read req body

app.use(express.json());

// main routes

app.use(mainRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
