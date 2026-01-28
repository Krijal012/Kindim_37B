import express from "express";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";
import {
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed
} from "../Controller/recentlyViewedController.js";

const recentlyViewedRouter = express.Router();

recentlyViewedRouter.post("/", verifyTokenMiddleware, addToRecentlyViewed);
recentlyViewedRouter.get("/", verifyTokenMiddleware, getRecentlyViewed);
recentlyViewedRouter.delete("/", verifyTokenMiddleware, clearRecentlyViewed);

export default recentlyViewedRouter;
