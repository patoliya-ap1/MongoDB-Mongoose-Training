import { Request, Response } from "express";

/**
 * Handle response for invalid routes
 *
 * @route All routes
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response invalid api route
 *
 */
export const invalidRoute = async (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `api route not found`,
  });
};
