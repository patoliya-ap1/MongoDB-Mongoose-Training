import express from "express";
import { studentRouter } from "./student/studentRoute";
import { userRouter } from "./user/userRoute";
import { bookRouter } from "./book/bookRoute";

export const mainRouter = express.Router();

mainRouter.use("/students", studentRouter);

mainRouter.use("/users", userRouter);

mainRouter.use("/books", bookRouter);
