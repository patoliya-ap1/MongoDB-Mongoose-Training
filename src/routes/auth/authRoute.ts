import express from "express";
import { createUsers } from "../../controller/ecom-user/ecom-userController";
import { login } from "../../controller/auth/authController";
import { zodValidate } from "../../middleware/zodMiddleware";
import { ecomUserSchema } from "../../schemas/ecom-user.schema";

export const authRouter = express.Router();

// create ecom users
authRouter.post("/signup", createUsers);

//login users
authRouter.post("/login", zodValidate(ecomUserSchema), login);
