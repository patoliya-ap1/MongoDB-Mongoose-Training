import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is require."] },
  email: {
    type: String,
    required: [true, "author is require."],
    unique: [true, "email must be unique"],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please enter valid email",
    ],
  },
  borrowedBooks: [{ type: Schema.Types.ObjectId, ref: "books" }],
});

export const UserModel = mongoose.model("book-users", userSchema);
