import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
  if (!process.env.JWT_SECRET) {
    console.warn("WARNING: JWT_SECRET not set in .env, using fallback.");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
};