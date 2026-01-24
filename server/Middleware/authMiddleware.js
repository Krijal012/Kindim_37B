import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Contains { id, email, role }
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};