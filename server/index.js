// index.js - Add this BEFORE connection()

import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import { authRouter } from "./Routes/authRoutes.js";
import { productRouter } from "./Routes/productRoutes.js";
import { cartRouter } from "./Routes/cartRoutes.js";
import { wishlistRouter } from "./Routes/wishlistRoutes.js"; // ← ADD THIS
import profileRoutes from "./Routes/profile.js";

// Import models for associations
import Wishlist from "./Model/wishlistModel.js";
import Product from "./Model/productModel.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ===== ASSOCIATIONS ===== (Add this BEFORE connection())
Wishlist.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Wishlist, { foreignKey: 'productId' });
// ========================

// Database Connection
connection();

// Routes
app.use("/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter); // ← ADD THIS

// Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});