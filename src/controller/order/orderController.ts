import { OrderModel } from "../../models/order.model";
import { AppError } from "../../utility/AppError";
import { NextFunction, Request, Response } from "express";

/**
 * create order
 *
 * @route POST order
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing created order
 *
 */
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orderData = req.body;
  try {
    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      message: "order created successfully.",
      newOrder: savedOrder,
    });
    if (!savedOrder) {
      const err = new AppError("error while creating order", 400);
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch orders
 *
 * @route GET /orders
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of orders
 *
 */
export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await OrderModel.find();

    if (!orders) {
      const err = new AppError("error while fetching orders", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "orders fetched successfully.",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a order by ID
 *
 * @route PUT order/:id
 *
 * @param  req - Express request object
 * @param {string} req.params.id - ID of the order to update
 * @param {Object} req.body - Data to update the order with
 *
 * @param  res - Express response object
 *
 * @returns {Promise<void>} Sends updated order data in JSON response
 *
 *
 */
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orderId = req.params.id;
  const updateData = req.body;

  try {
    const isOrderExists = await OrderModel.findById(orderId);

    if (!isOrderExists) {
      const err = new AppError("order not found with this id", 404);
      return next(err);
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { returnDocument: "after" },
    );
    if (!updatedOrder) {
      const err = new AppError("error while updating order", 400);
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "order updated successfully.",
      updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a order by Id
 *
 * @route DELETE orders/:Id
 *
 * @param  req - Express request object
 *
 * @param  res - Express response object
 *
 * @returns {Promise<void>} Sends deleted orders data in JSON response
 *
 *
 */
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orderId = req.params.id;
  try {
    const isOrderExists = await OrderModel.findById(orderId);

    if (!isOrderExists) {
      const err = new AppError("order not found with this name", 404);
      return next(err);
    }

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      const err = new AppError("error while deleting order.", 400);
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "order deleted successfully.",
      deletedOrder,
    });
  } catch (error) {
    next(error);
  }
};
