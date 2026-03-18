import { StudentModel } from "../../models/Student";
import { CourseQuery } from "../../utility/types";
import { Request, Response } from "express";

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


export const updateStudent = async (req: Request, res: Response) => {
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


export const deleteStudent = async (req: Request, res: Response) => {
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
