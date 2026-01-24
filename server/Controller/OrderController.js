
import { Order } from "../Model/Order.js";
import { OrderItem } from "../Model/OrderItem.js";

export const createOrder = async (req, res) => {
  try {
    const { shippingAddressId, items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = 50;
    const totalPrice = subtotal + deliveryFee;

    const order = await Order.create({
      shippingAddressId,
      totalPrice,
    });

    const orderItems = items.map((item) => ({
      orderId: order.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
