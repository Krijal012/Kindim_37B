import { apiRequest } from "../utils/api";

const OrderSummary = ({ cartItems, selectedAddress, paymentMethod }) => {
  const deliveryFee = 50;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    if (!selectedAddress || !paymentMethod) return;

    await apiRequest("post", "/orders", {
      data: {
        items: cartItems,
        address: selectedAddress,
        paymentMethod,
        totalAmount: total,
      },
    });

    await apiRequest("delete", "/cart/clear");
  };

  return (
    <div className="bg-[#D9D9D9] p-5 mb-6">
      <h3 className="font-bold mb-4">Order Summary</h3>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between text-sm">
          <span>{item.name} × {item.quantity}</span>
          <span>{item.price * item.quantity}</span>
        </div>
      ))}

      <div className="flex justify-between mt-2">
        <span>Subtotal</span>
        <span>{subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Delivery</span>
        <span>{deliveryFee}</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{total}</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedAddress || !paymentMethod}
        className="w-full mt-4 bg-[#1E5EFF] text-white rounded-full py-2 disabled:opacity-50"
      >
        I Have Paid
      </button>
    </div>
  );
};

export default OrderSummary;
