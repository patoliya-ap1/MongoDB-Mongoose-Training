import mongoose from "mongoose";

// student schema
const studentSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String, required: [true, "Email is required"] },
  course: { type: String },
});

// student model
export const StudentModel = mongoose.model("students", studentSchema);
