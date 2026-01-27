import express from "express";
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from "../Controller/orderController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication to all order routes
router.use(verifyToken);

router.post("/", createOrder);
router.get("/all", getAllOrders); // Must be before /:id to avoid conflict if id matches "all" (though UUID prevents this usually)
router.get("/", getOrdersByUser);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;