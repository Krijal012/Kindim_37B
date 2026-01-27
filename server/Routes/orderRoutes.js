import express from "express";
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getSellerOrders
} from "../Controller/orderController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication to all order routes
router.use(verifyTokenMiddleware);

router.post("/", createOrder);
router.get("/all", getAllOrders);
router.get("/seller-orders", getSellerOrders); // Added from Incoming
router.get("/", getOrdersByUser);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;