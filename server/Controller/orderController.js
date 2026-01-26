import Order from "../Model/Order.js";
import User from "../Model/userModel.js";
import Product from "../Model/productModel.js";


export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const orders = await Order.findAll({
      where: { sellerId },   
      include: [
        { model: Product, attributes: ["name", "image", "price"] },
        { model: User, as: "buyer", attributes: ["username", "email"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};