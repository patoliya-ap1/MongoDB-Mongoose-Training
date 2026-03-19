import { StudentModel } from "../../models/Student";
import { CourseQuery } from "../../utility/types";
import { Request, Response } from "express";

/**
 * Fetch students optionally filtered by course
 *
 * @route GET /api/students
 * @query {string} [course] - Filter students by course name
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of students
 *
 */
export const getStudents = async (req: Request, res: Response) => {
  const course = req.query.course as string;

  const filterObject: CourseQuery = {};
  if (course) {
    filterObject.course = course;
  }
  const students = await StudentModel.find(filterObject);
  res.status(200).json({
    success: true,
    message: "students fetched successfully.",
    students,
  });
};

/**
 * Update a student by ID
 *
 * @route PUT /api/students/:id
 *
 * @param  req - Express request object
 * @param {string} req.params.id - ID of the student to update
 * @param {Object} req.body - Data to update the student with
 *
 * @param  res - Express response object
 *
 * @returns {Promise<void>} Sends updated student data in JSON response
 *
 *
 */
export const updateStudent = async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const updateData = req.body;

  const updatedStudent = await StudentModel.findByIdAndUpdate(
    studentId,
    updateData,
    { returnDocument: "after" },
  );
  res.status(200).json({
    success: true,
    message: "students updated successfully.",
    updatedStudent,
  });
};

/**
 * Delete a student by name
 *
 * @route DELETE /api/students/:name
 *
 * @param  req - Express request object
 * @param {string} req.params.name - name of the student for delete
 *
 * @param  res - Express response object
 *
 * @returns {Promise<void>} Sends deleted student data in JSON response
 *
 *
 */
export const deleteStudent = async (req: Request, res: Response) => {
  const name = req.params.name;

  const deletedStudent = await StudentModel.findOneAndDelete({ name });
  res.status(200).json({
    success: true,
    message: "students deleted successfully.",
    deletedStudent,
  });
};
