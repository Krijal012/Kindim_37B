import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";

import { authRouter } from "./Routes/authRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import cartRouter from "./Routes/cartRoutes.js";
import { wishlistRouter } from "./Routes/wishlistRoutes.js";
import shippingRoutes from "./Routes/shippingRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import profileRoutes from "./Routes/profile.js";
import bargainRoutes from "./Routes/bargainRoutes.js";
import { getAllUsers, deleteUser } from "./Controller/authController.js";
import adminRoutes from "./Routes/adminRoutes.js";

import Wishlist from "./Model/wishlistModel.js";
import Product from "./Model/productModel.js";
import "./Model/userModel.js";
import "./Model/Order.js"; // Ensure Order model is loaded if needed specifically, though usually imported in controllers
import "./Database/associations.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Associations
Wishlist.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Wishlist, { foreignKey: "productId" });

connection();

// Routes
app.use("/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/shipping", shippingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/bargains", bargainRoutes);
app.get("/auth/users", getAllUsers); // From Incoming
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
