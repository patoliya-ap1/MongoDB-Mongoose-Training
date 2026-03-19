import { UserModel } from "../../models/user.model";
import { FilterForUsers } from "../../utility/types";
import { Request, Response } from "express";

/**
 * Fetch books users optionally filtered by email
 *
 * @route GET /users
 * @query {string} [email] - Filter user by email
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of Users
 *
 */
export const getUsers = async (req: Request, res: Response) => {
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
};

/**
 * Create user
 *
 * @route POST /users
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response new user
 *
 */
export const createUsers = async (req: Request, res: Response) => {
  const userData = req.body;

  const newUser = new UserModel(userData);
  const savedUser = await newUser.save();

  res.status(201).json({
    success: "true",
    message: "new user created successfully",
    newUser: savedUser,
  });
};
