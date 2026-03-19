import express from "express";
import { UserModel } from "../../models/user.model";
import { FilterForUsers } from "../../utility/types";

export const userRouter = express.Router();

// create books users

userRouter.post("/", async (req, res) => {
  const userData = req.body;

  const newUser = new UserModel(userData);
  const savedUser = await newUser.save();

  res.status(201).json({
    success: "true",
    message: "new user created successfully",
    newUser: savedUser,
  });
});

//get users

userRouter.get("/", async (req, res) => {
  const userEmail = req.query.email as string;

  const filterObj: FilterForUsers = {};

  if (userEmail) {
    filterObj.email = userEmail;
  }

  const users = await UserModel.find(filterObj).populate("borrowedBooks");

  res.status(200).json({
    success: true,
    message: "books users fetched successfully.",
    users,
  });
});
