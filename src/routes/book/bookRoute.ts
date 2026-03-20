import express from "express";
import {
  borrowedBooks,
  countBooksPerCategory,
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

//  count books per category
bookRouter.get("/categories/count-books", countBooksPerCategory);

// borrowed book
bookRouter.put("/borrow-book/:id", borrowedBooks);
