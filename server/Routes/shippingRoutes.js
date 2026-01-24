import express from "express";
import {
  getShippingAddresses,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getShippingAddressById
  
} from "../Controller/shippingController.js";

const router = express.Router();

router.get("/", getShippingAddresses);
router.post("/", createShippingAddress);
router.put("/:id", updateShippingAddress);
router.delete("/:id", deleteShippingAddress);
router.get("/:id", getShippingAddressById); 



export default router;
