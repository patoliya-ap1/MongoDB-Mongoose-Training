import { NextFunction, Request, Response } from "express";
import { EcomUserModel } from "../../models/ecom-user.model";
import { AppError } from "../../utility/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * login user
 *
 * @route post /auth/login
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing token
 *
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await EcomUserModel.findOne({ email });
    if (!isUserExist) {
      const err = new AppError(`user not found with email ${email}`, 404);
      return next(err);
    }

    // compare password
    const passwordMatch = await bcrypt.compare(password, isUserExist.password);

    if (!passwordMatch) {
      const err = new AppError(`invalid credentials`, 401);
      return next(err);
    }
    if (!JWT_SECRET) {
      const err = new AppError(`please provide JWT_SECRET variable`, 404);
      return next(err);
    }

    const accessToken = jwt.sign(
      {
        userId: isUserExist._id,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("token", accessToken);

    res.status(200).json({ success: true, message: "login success" });
  } catch (error) {
    next(error);
  }
};
