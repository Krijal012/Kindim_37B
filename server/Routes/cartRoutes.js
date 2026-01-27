import express from "express";
import {
  addToCart,
  clearCart,
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../Controller/cartController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyTokenMiddleware);

router.get("/", getCartItems);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);
router.delete("/clear", clearCart);

export default router;
