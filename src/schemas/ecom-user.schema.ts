import { z } from "zod";

export const ecomUserSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "please enter valid email" }),
  password: z
    .string({ message: "password is required" })
    .min(8, "password must be 8 or more character"),
});
