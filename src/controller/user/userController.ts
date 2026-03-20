import { UserModel } from "../../models/user.model";
import { AppError } from "../../utility/AppError";
import { FilterForUsers } from "../../utility/types";
import { NextFunction, Request, Response } from "express";

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
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userEmail = req.query.email as string;

  try {
    const filterObj: FilterForUsers = {};

    if (userEmail) {
      filterObj.email = userEmail;
    }

    const users = await UserModel.find(filterObj).populate("borrowedBooks");

    if (!users) {
      const err = new AppError("error while fetching books-users", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "books-users fetched successfully.",
      users,
    });
  } catch (error) {
    next(error);
  }
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
export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userData = req.body;

  try {
    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();

    if (!savedUser) {
      const err = new AppError("error while creating books-users", 400);
      return next(err);
    }

    res.status(201).json({
      success: "true",
      message: "new user created successfully",
      newUser: savedUser,
    });
  } catch (error) {
    next(error);
  }
};
