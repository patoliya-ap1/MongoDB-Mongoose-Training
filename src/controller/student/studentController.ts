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
export const updateStudent = async (req: Request, res: Response) => {
  const course = req.query.course as string;

  const filterObject: CourseQuery = {};
  if (course) {
    filterObject.course = course;
  }
  const students = await StudentModel.find(filterObject);
  res.status(200).json({
    success: true,
    message: "students updated successfully.",
    students,
  });
};

export const deleteStudent = async (req: Request, res: Response) => {
  const course = req.query.course as string;

  const filterObject: CourseQuery = {};
  if (course) {
    filterObject.course = course;
  }
  const students = await StudentModel.find(filterObject);
  res.status(200).json({
    success: true,
    message: "students deleted successfully.",
    students,
  });
};
