import express from "express";
import {
  createStudents,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../controller/student/studentController";
import { zodValidate } from "../../middleware/zodMiddleware";
import { studentSchema } from "../../schemas/student.schema";

export const studentRouter = express.Router();

// create students
studentRouter.post("/", zodValidate(studentSchema), createStudents);

// Fetch all students in a specific course
studentRouter.get("/", getStudents);

// Update a student’s email.
studentRouter.put("/:id", updateStudent);

// Delete a student by name.
studentRouter.delete("/", deleteStudent);
