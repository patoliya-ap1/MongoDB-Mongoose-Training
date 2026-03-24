import mongoose from "mongoose";
import { ProductModel } from "../models/products.model";
import { OrderModel } from "../models/order.model";
import { TransactionParams } from "./types";

export const createOrderService = async ({
  userId,
  productId,
  quantity,
}: TransactionParams) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Deduct stock atomically
    const product = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      },
      {
        returnDocument: "after",
        session,
      },
    );

    if (!product) {
      throw new Error("product not found or insufficient stock");
    }

    //  Calculate total price
    const totalPrice = product.price * quantity;

    // Create order
    const order = await OrderModel.create(
      [
        {
          userId,
          productId,
          quantity,
          totalPrice,
        },
      ],
      { session },
    );

    // 4. Commit
    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
