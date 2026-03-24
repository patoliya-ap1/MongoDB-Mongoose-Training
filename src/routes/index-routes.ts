import express from "express";
import { studentRouter } from "./student/studentRoute";
import { userRouter } from "./user/userRoute";
import { bookRouter } from "./book/bookRoute";
import { productRouter } from "./product/productRoute";
import { orderRouter } from "./order/orderRoute";
import { authRouter } from "./auth/authRoute";

export const mainRouter = express.Router();

// students route
mainRouter.use("/students", studentRouter);

// users route
mainRouter.use("/users", userRouter);

// auth route
mainRouter.use("/auth", authRouter);

// books route
mainRouter.use("/books", bookRouter);

// product route
mainRouter.use("/products", productRouter);

// orders route
mainRouter.use("/orders", orderRouter);
