import { EcomUserModel } from "../../models/ecom-user.model";
import { AppError } from "../../utility/AppError";
import { FilterForUsers } from "../../utility/types";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

/**
 * Fetch ecom users optionally filtered by email
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

    const users = await EcomUserModel.find(filterObj);

    if (!users) {
      const err = new AppError("error while fetching ecom-users", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "ecom-users fetched successfully.",
      users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create user
 *
 * @route POST /auth/signup
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response message
 *
 */
export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password, ...rest } = req.body;
  try {
    if (!password || !password?.trim()) {
      const err = new AppError("password is required", 400);
      return next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new EcomUserModel({ ...rest, password: hashedPassword });
    const savedUser = await newUser.save();

    if (!savedUser) {
      const err = new AppError("error while creating ecom-users", 400);
      return next(err);
    }

    res.status(201).json({
      success: "true",
      message: "new user created successfully",
    });
  } catch (error) {
    next(error);
  }
};
