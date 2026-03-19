import express from "express";
import { BookModel } from "../../models/Book";
import { FilterForBooks } from "../../utility/types";

export const bookRouter = express.Router();

// create books

bookRouter.post("/", async (req, res) => {
  const bookData = req.body;

  const newBook = new BookModel(bookData);
  const savedBook = await newBook.save();

  res.status(201).json({
    success: "true",
    message: "new book created successfully",
    newBook: savedBook,
  });
});

// get books and find books by category

bookRouter.get("/", async (req, res) => {
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
});

//  books average price per category

bookRouter.get("/categories/average-price", async (req, res) => {
  const books = await BookModel.aggregate([
    { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
    { $project: { category: "$_id", _id: 0, averagePrice: 1 } },
  ]);

  res.status(201).json({
    success: "true",
    message: "books fetched successfully",
    books,
  });
});


