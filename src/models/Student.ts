import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String, required: [true, "Email is required"] },
  course: { type: String },
});

export const StudentModel = mongoose.model("students", studentSchema);
