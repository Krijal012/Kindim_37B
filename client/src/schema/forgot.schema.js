import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Please enter a valid email" }),
});
