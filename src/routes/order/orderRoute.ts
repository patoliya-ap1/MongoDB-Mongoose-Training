import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  updateOrder,
  totalRevenuePerCategory,
  mostSoldProducts,
  dailySalesReport,
} from "../../controller/order/orderController";

export const orderRouter = express.Router();

// create order
orderRouter.post("/", createOrder);

// Fetch all order
orderRouter.get("/", getOrder);

// Update a order.
orderRouter.put("/:id", updateOrder);

// Delete a order by id.
orderRouter.delete("/:id", deleteOrder);

// total revenue per category
orderRouter.get("/total-revenue-per-category", totalRevenuePerCategory);

// top 3 most sold products
orderRouter.get("/most-sold-product", mostSoldProducts);

// daily sales report
orderRouter.get("/sales-report", dailySalesReport);
