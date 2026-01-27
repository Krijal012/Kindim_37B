import express from "express";
import {
    createBargain,
    getBargainsByUser,
    updateBargainStatus
} from "../Controller/bargainController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";
import { validateBargain } from "../Middleware/validation.js";

const router = express.Router();

router.use(verifyTokenMiddleware);

router.post("/", validateBargain, createBargain);
router.get("/", getBargainsByUser);
router.patch("/:id/status", updateBargainStatus);

export default router;