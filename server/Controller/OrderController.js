import { Order } from "../Model/Order.js";
import { OrderItem } from "../Model/OrderItem.js";
import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token
    const { shippingAddressId, items, paymentMethod, totalPrice } = req.body;

    console.log("Creating order for user:", userId);
    console.log("Order data:", { shippingAddressId, items, paymentMethod, totalPrice });

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddressId) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    // Create the order
    const order = await Order.create({
      userId,
      shippingAddressId,
      totalPrice,
      paymentMethod,
      status: "Pending",
    });

    console.log("Order created:", order.id);

    // Create order items
    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.productId ?? null,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    console.log("Order items created:", orderItems.length);

    // Clear user's cart after successful order
    await Cart.destroy({ where: { userId } });

    console.log("Cart cleared for user:", userId);

    res.status(201).json({
      message: "Order placed successfully",
      data: {
        orderId: order.id,
        totalPrice: order.totalPrice,
        status: order.status,
      },
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: err.message || "Failed to create order" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, include: [{ model: Product }] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: err.message || "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, userId },
      include: [{ model: OrderItem, include: [{ model: Product }] }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: err.message || "Failed to fetch order" });
  }
};
