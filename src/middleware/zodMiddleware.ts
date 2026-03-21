import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppError } from "../utility/AppError";
export const zodValidate =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const err = new AppError(error.issues[0].message, 400);
        return next(err);
      } else {
        next(error);
      }
    }
  };
