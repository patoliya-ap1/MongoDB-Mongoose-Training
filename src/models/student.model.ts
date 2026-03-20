import mongoose from "mongoose";

// student schema
const studentSchema = new mongoose.Schema({
  name: { type: String },
  age: {
    type: Number,
    cast: "Age must be number",
    min: [3, "Minimum age for student is 3"],
    max: [30, "Maximum age for student is 30"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter valid email",
    ],
  },
  course: { type: String },
});

// student model
export const StudentModel = mongoose.model("students", studentSchema);
