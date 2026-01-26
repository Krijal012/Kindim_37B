
import express from "express";
import { getSellerOrders } from "../Controller/orderController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();


router.get("/seller-orders", protect, getSellerOrders);

export default router;