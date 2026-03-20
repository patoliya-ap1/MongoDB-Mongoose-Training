import { BookModel } from "../../models/book.model";
import { FilterForBooks } from "../../utility/types";
import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";

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
export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const newBook = new BookModel(bookData);
  const savedBook = await newBook.save();

  res.status(201).json({
    success: "true",
    message: "new book created successfully",
    newBook: savedBook,
  });
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
export const getBooks = async (req: Request, res: Response) => {
  const category = req.query.category as string;

  const filterObj: FilterForBooks = {};

  if (category) {
    filterObj.category = category;
  }
  const books = await BookModel.find(filterObj);

  res.status(201).json({
    success: "true",
    message: "books fetched successfully",
    books,
  });
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
) => {
  const books = await BookModel.aggregate([
    { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
    { $project: { category: "$_id", _id: 0, averagePrice: 1 } },
  ]);

  res.status(201).json({
    success: "true",
    message: "books average price successfully",
    books,
  });
};

/**
 * Fetch books optionally filtered by category
 *
 * @route PUT /books/borrow-book/:id
 * @query {string} [category] - Filter user by category
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of borrowed books
 *
 */
export const borrowedBooks = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { userId } = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: { borrowedBooks: bookId },
    },
    { returnDocument: "after" },
  );

  res.status(200).json({
    success: true,
    message: "book borrowed successfully.",
    updatedUser,
  });
};
