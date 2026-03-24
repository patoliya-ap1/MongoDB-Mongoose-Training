import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utility/AppError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      const err = new AppError("token required for access resource", 404);
      return next(err);
    }

    const decodedToken = jwt.verify(token, JWT_SECRET || "");

    if (decodedToken) {
      req.userId = (decodedToken as any).userId || "";
      return next();
    }
  } catch (error) {
    next(error);
  }
};
