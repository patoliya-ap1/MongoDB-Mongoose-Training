import express from "express";
import {
  borrowedBooks,
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

// borrowed book

bookRouter.put("/borrow-book/:id", borrowedBooks);
