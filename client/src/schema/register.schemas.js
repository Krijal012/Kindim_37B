import { z } from "zod";

export const RegisterSchema = z
  .object({
    // Username: 3-20 characters, only letters, numbers, and underscores
    username: z
      .string()
      .nonempty({ message: "Username cannot be empty" })
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username cannot exceed 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),

    // Email: standard email validation
    email: z
      .string()
      .nonempty({ message: "Email cannot be empty" })
      .email({ message: "Email is invalid" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Please enter a valid email format",
      }),

    // Password: minimum 6 characters, must have letter and number
    password: z
      .string()
      .nonempty({ message: "Password cannot be empty" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
      }),

    // Confirm Password
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password cannot be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });