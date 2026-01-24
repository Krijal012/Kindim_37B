// Controller/wishlistController.js
import Wishlist from "../Model/wishlistModel.js";
import Product from "../Model/productModel.js";

// Get all wishlist items for a user
export const getWishlistItems = async (req, res) => {
    try {
        const userId = req.user.id;

        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image', 'category', 'rating']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if already in wishlist
        const existingItem = await Wishlist.findOne({
            where: { userId, productId }
        });

        if (existingItem) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        // Create new wishlist item
        const wishlistItem = await Wishlist.create({
            userId,
            productId
        });

        res.status(201).json({
            message: "Added to wishlist successfully",
            wishlistItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const wishlistItem = await Wishlist.findOne({
            where: { id, userId }
        });

        if (!wishlistItem) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }

        await wishlistItem.destroy();

        res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear entire wishlist
export const clearWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        await Wishlist.destroy({
            where: { userId }
        });

        res.status(200).json({ message: "Wishlist cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};