import express from "express";
import upload from "../Middleware/upload.js";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Controller/productController.js";
import { verifyTokenMiddleware, optionalVerifyTokenMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalVerifyTokenMiddleware, getAllProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);
router.post("/", verifyTokenMiddleware, upload.single("image"), createProduct);
router.put("/:id", verifyTokenMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", verifyTokenMiddleware, deleteProduct);

export default router;
