import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { StudentModel } from "./models/Student";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mongodb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// queries
//Fetch all students in a specific course

async function fetchStudentsByCourse(course: string) {
  const students = await StudentModel.find({ course });
  console.log(students);
}
//fetchStudentsByCourse("Electronics");

// Update a student’s email.

async function updateStudentsEmail(studentId: string, updateEmail: string) {
  const updatedStudentEmail = await StudentModel.findByIdAndUpdate(
    { _id: studentId },
    { email: updateEmail },
    { returnDocument: "after" },
  );
  console.log(updatedStudentEmail);
}
//updateStudentsEmail("69ba89c1a15ac856db4c3a36", "neha@gmail.com");

// Delete a student by name.

async function deleteStudentByName(studentName: string) {
  const deletedStudent = await StudentModel.findOneAndDelete({
    name: studentName,
  });
  console.log(deletedStudent);
}

// deleteStudentByName("Arjun Nair");

app.listen(3000, () => console.log("Server running on port 3000"));
