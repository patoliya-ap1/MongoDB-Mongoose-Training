import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ecom-users",
      required: [true, "userId is required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: [true, "productId is required"],
    },
    quantity: {
      type: Number,
      min: [1, "quantity must be 1 or above"],
      required: [true, "quantity is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "total price is required"],
    },
    date: {
      type: Date,
      default: new Date(Date.now()).toLocaleDateString("en-IN"),
      required: [true, "date is required"],
    },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model("orders", orderSchema);
