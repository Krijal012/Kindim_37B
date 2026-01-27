import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useAPI";
import { toast } from "react-toastify";

const OrderSummary = ({ cartItems, selectedAddress, paymentMethod }) => {
  const { callApi } = useApi();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryFee = 50;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.warn("Please select a shipping address");
      return;
    }

    if (!paymentMethod) {
      toast.warn("Please select a payment method");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        shippingAddressId: selectedAddress.id,
        items: cartItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod,
        totalPrice: total,
      };

      console.log("Placing order:", orderData);

      const res = await callApi("POST", "/orders", orderData); // ✅ Fixed - removed /api

      console.log("Order response:", res);

      toast.success("Order placed successfully!");
      
      setTimeout(() => {
        navigate("/orderhistory");
      }, 1500);

    } catch (err) {
      console.error("Place order failed:", err);
      toast.error(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm border-b pb-2">
            <span className="flex-1">{item.productName} × {item.quantity}</span>
            <span className="font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-3 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>Rs. {deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span className="text-blue-600">Rs. {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Selected Info */}
      {selectedAddress && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
          <p className="font-semibold text-green-700">✓ Delivery Address Selected</p>
          <p className="text-gray-600 text-xs mt-1">{selectedAddress.fullname}</p>
        </div>
      )}

      {paymentMethod && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="font-semibold text-blue-700">✓ Payment Method: {paymentMethod}</p>
        </div>
      )}

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={!selectedAddress || !paymentMethod || isPlacingOrder || cartItems.length === 0}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>

      {(!selectedAddress || !paymentMethod) && (
        <p className="text-center text-sm text-gray-500 mt-2">
          {!selectedAddress && "Select shipping address"}
          {!selectedAddress && !paymentMethod && " and "}
          {!paymentMethod && "payment method"}
        </p>
      )}
    </div>
  );
};

export default OrderSummary;