import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import { authRouter } from "./Routes/authRoutes.js";
import { productRouter } from "./Routes/productRoutes.js";
import { cartRouter } from "./Routes/cartRoutes.js";
import profileRoutes from "./Routes/profile.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (product images)
app.use("/uploads", express.static("uploads"));

// Database Connection
connection();

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Kindim API is running" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Server works" });
});

// Routes
app.use("/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});