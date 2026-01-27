import { Order } from "../Model/Order.js";
import { OrderItem } from "../Model/OrderItem.js";
import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";
import Users from "../Model/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token
    const { shippingAddressId, items, paymentMethod, totalPrice } = req.body;

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

    // Create order items
    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.productId ?? null,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    // Clear user's cart after successful order
    await Cart.destroy({ where: { userId } });

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

export const getAllOrders = async (req, res) => {
  try {
    // In a real multi-vendor app, we would filter by seller's products here.
    // For now, assuming admin/single-seller view of all orders.
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }]
        }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "All orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: err.message || "Failed to fetch all orders" });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    // Attempt to find orders by sellerId. 
    // If exact column 'sellerId' doesn't exist on Order table, this will fail. 
    // We might need to filter by OrderItems.Product.details.
    // But adhering to the incoming branch logic which assumes a multi-vendor 'sellerId' on Order or similar setup.
    // If this fails, we might need to adjust the Order model or this query.
    const orders = await Order.findAll({
      where: { sellerId },
      include: [
        { model: Product, attributes: ["name", "image", "price"] },
        // User association might differ based on exact model definition
        { model: Users, as: "buyer", attributes: ["username", "email"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({
      message: "Seller orders retrieved successfully",
      data: orders
    });
  } catch (error) {
    console.error(error);
    // Fallback if sellerId column issues: generic error
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected", "Shipped", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: `Order status updated to ${status}`,
      data: order,
    });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: err.message || "Failed to update order status" });
  }
};