import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
    console.log("Generating token with secret:", secret.substring(0, 10) + "...");
    return jwt.sign(payload, secret, { expiresIn: "1h" }); // Changed to 1 hour for testing
};

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
    console.log("Verifying token with secret:", secret.substring(0, 10) + "...");
    return jwt.verify(token, secret);
};