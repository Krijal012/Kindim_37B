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

export const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:category", getProductsByCategory);

// ✅ KEEP ONLY THIS ONE (It has the 'upload' middleware)
productRouter.post("/", upload.single("image"), createProduct);
// ✅ Corrected PUT route
productRouter.put("/:id", upload.single("image"), updateProduct);

productRouter.delete("/:id", deleteProduct);