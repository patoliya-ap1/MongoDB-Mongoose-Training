import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is require."] },
  author: { type: String, required: [true, "author is require."] },
  category: { type: String },
  price: {
    type: Number,
    required: [true, "price is require."],
    min: [0.01, "price must be greater that 0"],
  },
});

export const BookModel = mongoose.model("books", bookSchema);
