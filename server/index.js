import express from "express";
import cors from "cors";
import shippingRoutes from "./Routes/shippingRoutes.js";
import profileRoutes from "./Routes/profile.js";
import orderRoutes from "./Routes/orderRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import { connection } from "./database/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


connection();

app.get("/api/test", (req, res) => res.json({ message: "Server works" }));

app.use("/api/profile", profileRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);




app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
