import { useNavigate } from "react-router-dom";

function OrderSummary({ subtotal }) {
  const navigate = useNavigate();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold text-blue-600">Rs. {total.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg mb-3"
        onClick={() => alert("Checkout functionality coming soon!")}
      >
        Proceed to Checkout
      </button>

      <button
        onClick={() => navigate("/")}
        className="w-full border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSummary;