import express from "express";
import { 
  createOrder, 
  getOrdersByUser, 
  getOrderById 
} from "../Controller/OrderController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication to all order routes
router.use(verifyToken);

router.post("/", createOrder);
router.get("/", getOrdersByUser);
router.get("/:id", getOrderById);

export default router;