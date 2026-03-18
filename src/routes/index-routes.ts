import express from "express";
import { studentRouter } from "./student/studentRoute";

export const mainRouter = express.Router();

mainRouter.use("/students", studentRouter);
