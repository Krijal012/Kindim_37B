import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";

// Get all cart items for logged-in user
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image", "category", "rating"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1, selectedColor, selectedSize } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await Cart.findOne({
      where: { userId, productId },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.selectedColor ||= selectedColor;
      existingItem.selectedSize ||= selectedSize;
      await existingItem.save();

      return res.status(200).json(existingItem);
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      selectedColor,
      selectedSize,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity, selectedColor, selectedSize } = req.body;

    const cartItem = await Cart.findOne({ where: { id, userId } });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity !== undefined) cartItem.quantity = quantity;
    if (selectedColor !== undefined) cartItem.selectedColor = selectedColor;
    if (selectedSize !== undefined) cartItem.selectedSize = selectedSize;

    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove single item
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cartItem = await Cart.findOne({ where: { id, userId } });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.destroy({ where: { userId } });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
