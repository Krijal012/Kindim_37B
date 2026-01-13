import express from "express";
import { loginUser } from "../Controller/authController.js";

const router = express.Router();

// testing login route
router.post("/login", loginUser);

export default router;