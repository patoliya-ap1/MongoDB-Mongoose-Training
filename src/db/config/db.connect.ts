import mongoose from "mongoose";

export function initializeDatabase() {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mongodb")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
}
