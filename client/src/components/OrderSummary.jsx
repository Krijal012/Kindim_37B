import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";

const OrderSummary = ({ cartItems, selectedAddress, paymentMethod }) => {
  const { callApi } = useApi();
  const navigate = useNavigate();
  const deliveryFee = 50;
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    if (!selectedAddress || !paymentMethod) {
      toast.warn("Please select address and payment method");
      return;
    }

    setIsPlacingOrder(true);

    const orderItemsPayload = cartItems.map(item => ({
      // The backend OrderItem model likely expects only these fields.
      // Sending extra fields like 'id' or 'productId' can cause validation errors.
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      // The third argument to callApi is the request body (data).
      // The useApi hook handles authentication headers automatically.
      await callApi("POST", "/api/orders", {
        items: orderItemsPayload,
        shippingAddressId: selectedAddress.id,
        paymentMethod,
        totalPrice: total,
      });
      
      toast.success("Payment completed successfully!");
      navigate("/orderhistory");

    } catch (err) {
      console.error("Payment failed", err);
      toast.error(err.message || "Payment failed. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border sticky top-24">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between text-sm mb-2">
          <span>{item.productName} × {item.quantity}</span>
          <span>Rs. {item.price * item.quantity}</span>
        </div>
      ))}

      <div className="border-t pt-3 mt-3 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs. {deliveryFee}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-blue-600">Rs. {total}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedAddress || !paymentMethod || isPlacingOrder}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
