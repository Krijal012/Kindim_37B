import RecentlyViewed from "../Model/recentlyViewedModel.js";
import Product from "../Model/productModel.js";

export const addToRecentlyViewed = async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;

    try {
        // Check if it already exists
        const existing = await RecentlyViewed.findOne({
            where: { userId, productId }
        });

        if (existing) {
            // Update timestamp by touching the record
            existing.changed('updatedAt', true);
            await existing.save();
            return res.status(200).json({ message: "Updated recently viewed", recentlyViewed: existing });
        }

        const newItem = await RecentlyViewed.create({ userId, productId });
        res.status(201).json({ message: "Added to recently viewed", recentlyViewed: newItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecentlyViewed = async (req, res) => {
    const userId = req.userId;

    try {
        const items = await RecentlyViewed.findAll({
            where: { userId },
            include: [{ model: Product }],
            order: [['updatedAt', 'DESC']],
            limit: 20
        });

        // Map to return products directly with extra info if needed
        const products = items.map(item => item.Product);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearRecentlyViewed = async (req, res) => {
    const userId = req.userId;

    try {
        await RecentlyViewed.destroy({
            where: { userId }
        });
        res.status(200).json({ message: "Recently viewed cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
