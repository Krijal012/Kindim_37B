import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  phone: z.string().min(7, "Invalid phone number"),
  email: z.string().email("Invalid email"),
});
