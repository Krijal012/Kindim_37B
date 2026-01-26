import { Bargain } from "../Model/Bargain.js";

export const createBargain = async (req, res, next) => {
    try {
        const { productId, productName, originalPrice, proposedPrice, reason } = req.body;
        
        const bargain = await Bargain.create({
            userId: req.userId,
            productId,
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
            where: { userId: req.userId },
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

export const updateBargainStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const bargain = await Bargain.findByPk(id);
        
        if (!bargain) {
            return res.status(404).json({ error: 'Bargain not found' });
        }
        
        bargain.status = status;
        await bargain.save();
        
        res.status(200).json({
            message: 'Bargain status updated',
            data: bargain
        });
    } catch (error) {
        next(error);
    }
};