import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" }) // add this
    .min(6, { message: "Password must be at least 6 characters" }),
});
