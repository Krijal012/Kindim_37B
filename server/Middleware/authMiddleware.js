import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    console.log("=== AUTH MIDDLEWARE DEBUG ===");
    console.log("1. Auth Header:", authHeader);

    if (!authHeader) {
      console.log("ERROR: No auth header");
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("2. Extracted Token:", token ? token.substring(0, 50) + "..." : "null");

    if (!token) {
      console.log("ERROR: No token after split");
      return res.status(401).json({ message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET || "your-fallback-secret-key-change-this";
    console.log("3. JWT_SECRET:", secret.substring(0, 10) + "...");
    console.log("4. Full secret length:", secret.length);
    
    const decoded = jwt.verify(token, secret);
    console.log("5. Token decoded successfully:", decoded);
    
    req.user = decoded;
    req.userId = decoded.id;
    
    console.log("=== AUTH SUCCESS ===");
    next();
  } catch (error) {
    console.error("=== AUTH FAILED ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    return res.status(401).json({ message: error.message });
  }
};