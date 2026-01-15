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
} from "../Controller/authController.js";

export const authRouter = express.Router();

// Authentication Routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpass", forgotPassword);
authRouter.post("/resetpass/:token", resetPassword);

// User Management Routes
authRouter.get("/users", getAllUsers);
authRouter.get("/users/:id", getUserById);
authRouter.put("/users/:id", updateUser);
authRouter.delete("/users/:id", deleteUser);