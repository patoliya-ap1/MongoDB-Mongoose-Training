import express from "express";
import {
  createBook,
  getBooks,
  getBooksAveragePerCategory,
} from "../../controller/book/bookController";

export const bookRouter = express.Router();

// create books
bookRouter.post("/", createBook);

// get books and find books by category
bookRouter.get("/", getBooks);

//  books average price per category
bookRouter.get("/categories/average-price", getBooksAveragePerCategory);
