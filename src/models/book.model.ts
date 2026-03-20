import mongoose from "mongoose";

// book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is require."] },
  author: { type: String, required: [true, "author is require."] },
  category: {
    type: String,
    enum: {
      values: [
        "Fiction",
        "Self-help",
        "Travel",
        "History",
        "Finance",
        "Cooking",
        "Technology",
        "Science Fiction",
      ],
      message:
        "invalid category for books, please add one of these Fiction,Self-help,Travel,History,Finance,Cooking,Technology,Science Fiction",
    },
  },
  price: {
    type: Number,
    required: [true, "price is require."],
    min: [1, "price must be greater that 0"],
  },
});

// book model
export const BookModel = mongoose.model("books", bookSchema);
