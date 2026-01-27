import express from "express";
import { getAdminStats } from "../Controller/adminController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyTokenMiddleware);

// Middleware to check for Admin role
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin only." });
    }
};

router.get("/stats", verifyAdmin, getAdminStats);

export default router;
