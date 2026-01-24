import express from "express";
import { addToCart, clearCart, getCartItems, removeFromCart, updateCartItem } from "../Controller/cartController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

export const cartRouter = express.Router();

cartRouter.use(verifyToken);

cartRouter.get("/", getCartItems);
cartRouter.post("/", addToCart);
cartRouter.put("/:id", updateCartItem);
cartRouter.delete("/:id", removeFromCart);
cartRouter.delete("/clear", clearCart);
