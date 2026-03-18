import express from "express";
import { StudentModel } from "../../models/Student";
import {
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../controller/student/studentController";

export const studentRouter = express.Router();

// Fetch all students in a specific course
studentRouter.get("/", getStudents);

// Update a student’s email.

studentRouter.put("/:id", updateStudent);

// Delete a student by name.

studentRouter.delete("/", deleteStudent);
