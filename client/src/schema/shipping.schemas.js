import { z } from "zod";

export const ShippingSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name must be less than 50 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(100, { message: "Address must be less than 100 characters" }),
  phonenumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
});
