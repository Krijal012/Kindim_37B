import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";

// Get all cart items for a user
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id; // From JWT middleware

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image', 'category', 'rating']
                }
            ],
            order: [['createdAt', 'DESC']]
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
        const { productId, quantity, selectedColor, selectedSize } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if item already exists in cart
        const existingItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity += quantity || 1;
            existingItem.selectedColor = selectedColor || existingItem.selectedColor;
            existingItem.selectedSize = selectedSize || existingItem.selectedSize;
            await existingItem.save();

            return res.status(200).json({
                message: "Cart updated successfully",
                cartItem: existingItem
            });
        }

        // Create new cart item
        const cartItem = await Cart.create({
            userId,
            productId,
            quantity: quantity || 1,
            selectedColor,
            selectedSize
        });

        res.status(201).json({
            message: "Added to cart successfully",
            cartItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity, selectedColor, selectedSize } = req.body;

        const cartItem = await Cart.findOne({
            where: { id, userId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (quantity !== undefined) cartItem.quantity = quantity;
        if (selectedColor !== undefined) cartItem.selectedColor = selectedColor;
        if (selectedSize !== undefined) cartItem.selectedSize = selectedSize;

        await cartItem.save();

        res.status(200).json({
            message: "Cart item updated successfully",
            cartItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const cartItem = await Cart.findOne({
            where: { id, userId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await cartItem.destroy();

        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await Cart.destroy({
            where: { userId }
        });

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};