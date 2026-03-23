import express from "express";
import {
  createUsers,
  getUsers,
} from "../../controller/ecom-user/ecom-userController";

export const ecomUserRouter = express.Router();

// create ecom users
ecomUserRouter.post("/ecom-users", createUsers);

//get users
ecomUserRouter.get("/ecom-users", getUsers);
