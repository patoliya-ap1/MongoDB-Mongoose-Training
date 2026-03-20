import { BookModel } from "../../models/book.model";
import { FilterForBooks } from "../../utility/types";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import { AppError } from "../../utility/AppError";

/**
 * Create books
 *
 * @route POST /books
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response new books
 *
 */
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookData = req.body;
  try {
    const newBook = new BookModel(bookData);
    const savedBook = await newBook.save();

    // if error while saving book
    if (!savedBook) {
      const err = new AppError("error while create book", 400);
      return next(err);
    }

    res.status(201).json({
      success: "true",
      message: "new book created successfully",
      newBook: savedBook,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch books optionally filtered by category
 *
 * @route GET /books
 * @query {string} [category] - Filter user by category
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of books
 *
 */
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const category = req.query.category as string;
  try {
    const filterObj: FilterForBooks = {};

    if (category) {
      filterObj.category = category;
    }
    const books = await BookModel.find(filterObj);

    // if error while fetching book
    if (!books) {
      const err = new AppError("error while fetching book", 400);
      return next(err);
    }

    res.status(201).json({
      success: "true",
      message: "books fetched successfully",
      books,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch books average price per category
 *
 * @route GET /books/categories/average-price
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing books average price per category
 *
 */
export const getBooksAveragePerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await BookModel.aggregate([
      { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
      { $project: { category: "$_id", _id: 0, averagePrice: 1 } },
    ]);

    // if error while fetching book average price per category
    if (!books) {
      const err = new AppError(
        "error while fetching books average price per category",
        400,
      );
      return next(err);
    }

    res.status(201).json({
      success: "true",
      message: "books average price successfully",
      books,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * books borrow
 *
 * @route PUT /books/borrow-book/:id
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of borrowed books
 *
 */
export const borrowedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = req.params.id as string;
    const { userId } = req.body;

    const bookAlreadyExist = await UserModel.findOne({
      _id: userId,
      borrowedBooks: { $in: [bookId] },
    });

    if (bookAlreadyExist) {
      const err = new AppError("already borrow this book", 400);
      return next(err);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { borrowedBooks: bookId },
      },
      { returnDocument: "after" },
    );

    // if error while borrow book
    if (!updatedUser) {
      const err = new AppError("error while borrow book", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "book borrowed successfully.",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
