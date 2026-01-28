import express from "express";
import {
    createBargain,
    getBargainsByUser,
    getBargainsBySeller,
    updateBargainStatus
} from "../Controller/bargainController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";
import { validateBargain } from "../Middleware/validation.js";

const router = express.Router();

router.use(verifyTokenMiddleware);

router.post("/", validateBargain, createBargain);
router.get("/", getBargainsByUser);
router.get("/seller", getBargainsBySeller);
router.patch("/:id/status", updateBargainStatus);

export default router;