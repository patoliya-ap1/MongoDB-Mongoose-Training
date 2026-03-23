import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../controller/product/productController";

export const productRouter = express.Router();

// create product
productRouter.post("/", createProduct);

// Fetch all product
productRouter.get("/", getProduct);

// Update a product.
productRouter.put("/:id", updateProduct);

// Delete a product by id.
productRouter.delete("/:id", deleteProduct);
