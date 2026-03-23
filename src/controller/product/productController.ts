import { ProductModel } from "../../models/products.model";
import { AppError } from "../../utility/AppError";
import { NextFunction, Request, Response } from "express";
import { Filter } from "mongodb";

/**
 * create product
 *
 * @route POST product
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing created product
 *
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productData = req.body;
  try {
    const newProduct = new ProductModel(productData);
    const savedProduct = await newProduct.save();
    res.status(200).json({
      success: true,
      message: "product created successfully.",
      newProduct: savedProduct,
    });
    if (!savedProduct) {
      const err = new AppError("error while creating product", 400);
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch products optionally filtered by name
 *
 * @route GET products
 * @query {string} [name] - Filter product by course name
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns {Promise<void>} Sends a JSON response containing list of products
 *
 */
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const search = req.query.q as string;
  try {
    const filterObject: Filter<any> = {};
    if (search) {
      filterObject.$text = { $search: search };
    }
    const products = await ProductModel.find(filterObject);

    if (!products) {
      const err = new AppError("error while fetching products", 400);
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "products fetched successfully.",
      products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a product by ID
 *
 * @route PUT product/:id
 *
 * @param  req - Express request object
 * @param {string} req.params.id - ID of the product to update
 * @param {Object} req.body - Data to update the product with
 *
 * @param  res - Express response object
 *
 * @returns {Promise<void>} Sends updated product data in JSON response
 *
 *
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const isProductExists = await ProductModel.findById(productId);

    if (!isProductExists) {
      const err = new AppError("product not found with this id", 404);
      return next(err);
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { returnDocument: "after" },
    );
    if (!updatedProduct) {
      const err = new AppError("error while updating product", 400);
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "product updated successfully.",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a product by Id
 *
 * @route DELETE products/:Id
 *
 * @param  req - Express request object
 *
 * @param  res - Express response object
 *
 * @returns {Promise<void>} Sends deleted products data in JSON response
 *
 *
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;
  try {
    const isProductExists = await ProductModel.findById(productId);

    if (!isProductExists) {
      const err = new AppError("product not found with this name", 404);
      return next(err);
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      const err = new AppError("error while deleting product.", 400);
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully.",
      deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
