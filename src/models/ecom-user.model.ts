import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      min: [5, "username must be 5 or more character"],
      required: [true, "username name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "please enter valid email",
      ],
      unique: [true, "email must be unique"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      min: [8, "password must be 8 or more character"],
      max: [15, "password must be 15 or less character"],
      required: [true, "password is required"],
    },
  },
  { timestamps: true },
);

export const EcomUserModel = mongoose.model("ecom-users", userSchema);
