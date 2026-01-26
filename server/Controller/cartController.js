// server/Controller/cartController.js
import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";

export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token via middleware
    
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    
    res.status(200).json({ data: cartItems });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token
    const { productId, quantity, selectedColor, selectedSize } = req.body;

    // Check if already in cart
    const existing = await Cart.findOne({
      where: { userId, productId },
    });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.status(200).json({
        message: "Cart updated",
        data: existing,
      });
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      selectedColor,
      selectedSize,
    });

    res.status(201).json({
      message: "Product added to cart",
      data: cartItem,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      where: { id, userId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: "Cart updated",
      data: cartItem,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cartItem = await Cart.findOne({
      where: { id, userId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.destroy();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await Cart.destroy({
      where: { userId },
    });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: error.message });
  }
};