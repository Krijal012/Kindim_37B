import { Order } from "../Model/Order.js";
import { OrderItem } from "../Model/OrderItem.js";

export const createOrder = async (req, res, next) => {
    try {
        const { items, totalAmount, estimatedDelivery } = req.body;
        
        // Create order
        const order = await Order.create({
            userId: req.userId,
            totalAmount,
            status: 'pending',
            estimatedDelivery: estimatedDelivery || '12PM'
        });
        
        // Create order items
        const orderItems = await Promise.all(
            items.map(item => 
                OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity || 1,
                    image: item.image || null
                })
            )
        );
        
        res.status(201).json({
            message: 'Order created successfully',
            data: {
                order,
                items: orderItems
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.userId },
            include: [{
                model: OrderItem,
                as: 'items'
            }],
            order: [['createdAt', 'DESC']]
        });
        
        res.status(200).json({
            message: 'Orders retrieved successfully',
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const order = await Order.findOne({
            where: { 
                id,
                userId: req.userId 
            },
            include: [{
                model: OrderItem,
                as: 'items'
            }]
        });
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.status(200).json({
            message: 'Order retrieved successfully',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

export const getSellerOrders = async (req, res, next) => {
    try {
        const { status } = req.query;
        
        const whereClause = { sellerId: req.userId };
        if (status) {
            whereClause.status = status;
        }
        
        const orders = await Order.findAll({
            where: whereClause,
            include: [{
                model: OrderItem,
                as: 'items'
            }],
            order: [['createdAt', 'DESC']]
        });
        
        res.status(200).json({
            message: 'Seller orders retrieved successfully',
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const order = await Order.findByPk(id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        order.status = status;
        await order.save();
        
        res.status(200).json({
            message: 'Order status updated',
            data: order
        });
    } catch (error) {
        next(error);
    }
};