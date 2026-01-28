import { Bargain } from "../Model/Bargain.js";
import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";
import { Op } from "sequelize";

export const createBargain = async (req, res, next) => {
    try {
        const { productId, productName, originalPrice, proposedPrice, reason } = req.body;

        // Find product to get sellerId
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const bargain = await Bargain.create({
            userId: req.user?.id ?? req.userId,
            productId,
            sellerId: product.sellerId,
            productName,
            originalPrice,
            proposedPrice,
            reason: reason || null,
            status: 'pending'
        });

        res.status(201).json({
            message: 'Bargain offer submitted successfully',
            data: bargain
        });
    } catch (error) {
        next(error);
    }
};

export const getBargainsByUser = async (req, res, next) => {
    try {
        const bargains = await Bargain.findAll({
            where: { userId: req.user?.id ?? req.userId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: 'Bargains retrieved successfully',
            data: bargains
        });
    } catch (error) {
        next(error);
    }
};

export const getBargainsBySeller = async (req, res, next) => {
    try {
        const userId = req.user?.id ?? req.userId;
        console.log("Fetching bargains for seller ID:", userId);

        // Use association to find bargains for items owned by this seller
        const bargains = await Bargain.findAll({
            where: {
                [Op.or]: [
                    { sellerId: userId },
                    { '$Product.sellerId$': userId }
                ]
            },
            include: [{
                model: Product,
                required: false,
                attributes: ['sellerId', 'name']
            }],
            order: [['createdAt', 'DESC']]
        });

        console.log(`Found ${bargains.length} bargains`);

        res.status(200).json({
            message: 'Seller bargains retrieved successfully',
            data: bargains
        });
    } catch (error) {
        console.error("Error in getBargainsBySeller:", error);
        next(error);
    }
};

export const updateBargainStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const bargain = await Bargain.findByPk(id);

        if (!bargain) {
            return res.status(404).json({ error: 'Bargain not found' });
        }

        // Verify that the user updating the status is the seller of the product
        const userId = req.user?.id ?? req.userId;

        let isOwner = false;
        if (bargain.sellerId) {
            isOwner = bargain.sellerId === userId;
        } else {
            // Fallback: check the product owner
            const product = await Product.findByPk(bargain.productId);
            if (product && product.sellerId === userId) {
                isOwner = true;
                // Opportunistically fix the bargain record
                bargain.sellerId = userId;
                await bargain.save();
            }
        }

        if (!isOwner) {
            return res.status(403).json({ error: 'Only the seller can update bargain status' });
        }

        bargain.status = status;
        await bargain.save();

        res.status(200).json({
            message: `Bargain offer ${status} successfully`,
            data: bargain
        });
    } catch (error) {
        next(error);
    }
};