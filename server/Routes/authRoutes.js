import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword
  
} from "../Controller/authController.js";

export const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpass", forgotPassword);

authRouter.get("/users", getAllUsers);
authRouter.get("/users/:id", getUserById);
authRouter.put("/users/:id", updateUser);
authRouter.delete("/users/:id", deleteUser);
