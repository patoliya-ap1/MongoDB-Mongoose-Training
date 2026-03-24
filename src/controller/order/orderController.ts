import { OrderModel } from "../../models/order.model";
import { AppError } from "../../utility/AppError";
import { NextFunction, Request, Response } from "express";
import { createOrderService } from "../../utility/transactions";

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
  try {
    const { userId, productId, quantity } = req.body;

    const order = await createOrderService({
      userId,
      productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
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
 * Fetch revenue per category
 *
 * @route GET /orders/total-revenue-per-category
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response revenue per category
 *
 */
export const totalRevenuePerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const revenuePerCategory = await OrderModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalRevenue: {
            $sum: { $multiply: ["$quantity", "$productDetails.price"] },
          },
          orderCount: { $sum: 1 },
        },
      },
    ]);

    if (!revenuePerCategory) {
      const err = new AppError(
        "error while calculating revenue per category",
        400,
      );
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "total revenue per category fetched successfully.",
      revenuePerCategory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch most sold products
 *
 * @route GET /orders/most-sold-product
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response most sold products
 *
 */
export const mostSoldProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const soldProducts = await OrderModel.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantity" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    if (!soldProducts) {
      const err = new AppError(
        "error while fetching top 3 most sold products",
        400,
      );
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "top 3 most sold products fetched successfully.",
      soldProducts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch daily sales report
 *
 * @route GET /orders/sales-report
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response daily sales reports
 *
 */
export const dailySalesReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const salesReport = await OrderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$date" },
          },
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: "$totalPrice" },
          uniqueUsers: { $addToSet: "$userId" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    if (!salesReport) {
      const err = new AppError("error while calculating daily sales", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "daily sales report fetched successfully.",
      salesReport,
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
