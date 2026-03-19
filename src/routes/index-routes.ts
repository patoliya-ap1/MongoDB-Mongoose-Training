import express from "express";
import { studentRouter } from "./student/studentRoute";
import { userRouter } from "./user/userRoute";
import { bookRouter } from "./book/bookRoute";

export const mainRouter = express.Router();

// students route
mainRouter.use("/students", studentRouter);

// users route
mainRouter.use("/users", userRouter);

// books route
mainRouter.use("/books", bookRouter);
