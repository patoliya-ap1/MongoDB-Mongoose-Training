import { StudentModel } from "../../models/student.model";
import { AppError } from "../../utility/AppError";
import { CourseQuery } from "../../utility/types";
import { NextFunction, Request, Response } from "express";

/**
 * create student
 *
 * @route POST students
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing created student
 *
 */
export const createStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentData = req.body;
  try {
    const newStudent = new StudentModel(studentData);
    const savedStudent = await newStudent.save();
    res.status(200).json({
      success: true,
      message: "students created successfully.",
      newStudent: savedStudent,
    });
    if (!savedStudent) {
      const err = new AppError("error while creating student", 400);
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch students optionally filtered by course
 *
 * @route GET students
 * @query {string} [course] - Filter students by course name
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of students
 *
 */
export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const course = req.query.course as string;
  try {
    const filterObject: CourseQuery = {};
    if (course) {
      filterObject.course = course;
    }
    const students = await StudentModel.find(filterObject);

    if (!students) {
      const err = new AppError("error while fetching students", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "students fetched successfully.",
      students,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a student by ID
 *
 * @route PUT students/:id
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
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentId = req.params.id;
  const updateData = req.body;

  try {
    const isStudentExists = await StudentModel.findById(studentId);

    if (!isStudentExists) {
      const err = new AppError("student not found with this id", 404);
      return next(err);
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      updateData,
      { returnDocument: "after" },
    );
    if (!updateStudent) {
      const err = new AppError("error while updating student", 400);
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "students updated successfully.",
      updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a student by name
 *
 * @route DELETE students/:name
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
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const name = req.params.name;
  try {
    const isStudentExists = await StudentModel.findById(name);

    if (!isStudentExists) {
      const err = new AppError("student not found with this name", 404);
      return next(err);
    }

    const deletedStudent = await StudentModel.findOneAndDelete({ name });
    if (!deleteStudent) {
      const err = new AppError("error while deleting student.", 400);
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "students deleted successfully.",
      deletedStudent,
    });
  } catch (error) {
    next(error);
  }
};
