// server/Controller/wishlistController.js
import Wishlist from "../Model/wishlistModel.js";
import Product from "../Model/productModel.js";

export const getWishlistItems = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token
    
    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token
    const { productId } = req.body;

    // Check if already in wishlist
    const existing = await Wishlist.findOne({
      where: { userId, productId },
    });

    if (existing) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const wishlistItem = await Wishlist.create({
      userId,
      productId,
    });

    res.status(201).json({
      message: "Product added to wishlist",
      data: { wishlistItem },
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const item = await Wishlist.findOne({
      where: { id, userId },
    });

    if (!item) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    await item.destroy();
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await Wishlist.destroy({
      where: { userId },
    });

    res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    console.error("Clear wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
};