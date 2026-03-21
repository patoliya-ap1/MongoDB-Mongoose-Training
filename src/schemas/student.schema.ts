import { z } from "zod";

export const studentSchema = z.object({
  name: z
    .string({ message: "name is required and must be string" })
    .trim()
    .min(5, "name must be 5 or more character")
    .max(10, "name must be 10 less character"),
  age: z.number({ message: "age is required and must be number" }),
  email: z
    .string({ message: "email is required" })
    .email({ message: "please enter valid email" }),
  course: z
    .string({ message: "course is required and must be string" })
    .min(5, "course must be 5 or more character"),
});
