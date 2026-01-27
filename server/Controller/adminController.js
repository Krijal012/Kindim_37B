import Users from "../Model/userModel.js";
import { Order } from "../Model/Order.js";

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await Users.count();
        const totalSellers = await Users.count({ where: { role: "seller" } });
        const totalOrders = await Order.count();
        const revenue = await Order.sum("totalPrice") || 0;

        res.status(200).json({
            message: "Stats retrieved successfully",
            data: {
                totalUsers,
                totalOrders,
                revenue,
                totalSellers
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
