// controllers/cartController.js
import { Cart } from "../Model/Cart.js";

export const getCart = async (req, res) => {
  try {
    const items = await Cart.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
