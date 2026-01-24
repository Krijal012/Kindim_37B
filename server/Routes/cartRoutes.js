// routes/cartRoutes.js
import express from "express";
import { getCart } from "../Controller/cartController.js";

const router = express.Router();

router.get("/", getCart);

export default router;
