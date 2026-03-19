import express from "express";
import { createUsers, getUsers } from "../../controller/user/userController";

export const userRouter = express.Router();

// create books users
userRouter.post("/", createUsers);

//get users
userRouter.get("/", getUsers);
