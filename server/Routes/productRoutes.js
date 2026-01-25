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

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
