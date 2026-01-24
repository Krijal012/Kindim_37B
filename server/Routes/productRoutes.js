
import express from "express";
import { getProducts, addProduct } from "../Controller/productController.js";


const router = express.Router();


router.get("/", getProducts);


router.post("/", addProduct);

export default router;
