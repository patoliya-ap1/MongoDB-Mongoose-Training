import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      text: true,
      min: [5, "product title must be 5 or more character"],
      required: [true, "product name is required"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "Electronics",
          "Computers",
          "Furniture",
          "Footwear",
          "Clothing",
          "Accessories",
          "Appliances",
          "Home & Kitchen",
        ],
        message:
          "invalid category , add one of these Electronics , Computers , Furniture , Footwear , Clothing , Accessories , Appliances , Home & Kitchen",
      },
      required: [true, "category is required"],
    },
    price: {
      index: true,
      type: Number,
      min: [1, "price must be above 0"],
      required: [true, "price is required"],
    },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model("products", productSchema);
