
import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  gender: z.enum(["male", "female"], { errorMap: () => ({ message: "Please select gender" }) }),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  profileImage: z
    .any()
    .optional(),
});
