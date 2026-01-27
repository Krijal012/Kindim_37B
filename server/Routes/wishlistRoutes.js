// Routes/wishlistRoutes.js
import express from "express";
import { addToWishlist, clearWishlist, getWishlistItems, removeFromWishlist } from "../Controller/wishlistController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";

export const wishlistRouter = express.Router();

wishlistRouter.use(verifyTokenMiddleware);

wishlistRouter.get("/", getWishlistItems);
wishlistRouter.post("/", addToWishlist);
wishlistRouter.delete("/:id", removeFromWishlist);
wishlistRouter.delete("/clear/all", clearWishlist);