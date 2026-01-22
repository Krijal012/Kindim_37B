import express from "express";
import { addToCart, clearCart, getCartItems, removeFromCart, updateCartItem } from "../Controller/cartController";
import { verifyToken } from "../Middleware/authMiddleware";

export const cartRouter = express.Router();

cartRouter.use(verifyToken);

cartRouter.get("/", getCartItems);
cartRouter.post("/", addToCart);
cartRouter.put("/:id", updateCartItem);
cartRouter.delete("/:id", removeFromCart);
cartRouter.delete("/clear", clearCart);
