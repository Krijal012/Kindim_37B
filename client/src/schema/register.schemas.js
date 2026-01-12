import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username cannot be empty" })
    .min(3, { message: "Username must be at least 3 characters" }),

  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Email is invalid" }),

  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(6, { message: "Password must be at least 6 characters" }),

  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm password cannot be empty" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
