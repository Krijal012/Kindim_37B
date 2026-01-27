import express from "express";
import {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    changePassword,
} from "../Controller/authController.js";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";

export const authRouter = express.Router();

// Authentication Routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpass", forgotPassword);
authRouter.post("/resetpass/:token", resetPassword);
authRouter.post("/change-password", verifyTokenMiddleware, changePassword);

// User Management Routes
authRouter.get("/users", getAllUsers);
authRouter.get("/users/:id", getUserById);
authRouter.put("/users/:id", updateUser);
authRouter.delete("/users/:id", deleteUser);
