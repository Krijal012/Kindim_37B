import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
    return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
    return jwt.verify(token, secret);
};