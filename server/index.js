import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import { authRouter } from "./Routes/authRoutes.js";
import { productRouter } from "./Routes/productRoutes.js";
import { cartRouter } from "./Routes/cartRoutes.js";
import bargainRoutes from "./Routes/bargainRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import { errorHandler } from "./Middleware/errorHandler.js";

// Import models to establish relationships
import { Order } from './Model/Order.js';
import { OrderItem } from './Model/OrderItem.js';

// Establish relationships
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (product images)
app.use("/uploads", express.static("uploads"));

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Kindim API is running" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Server works" });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Existing Routes
app.use("/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

// New Routes - Bargain & Orders
app.use("/api/bargains", bargainRoutes);
app.use("/api/orders", orderRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        await connection();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();