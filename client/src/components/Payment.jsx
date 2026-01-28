import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";

export default function Payment() {
  const { callApi, loading } = useApi();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await callApi("GET", "/api/orders");
        setOrders(res?.data || res || []);
      } catch (err) {
        console.error("Payments fetch error:", err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Payments</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading payments...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <p className="text-gray-500 text-base sm:text-lg">No payments yet</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">Place an order and it will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow">
              {/* Order Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Order ID: #{order.id}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs sm:text-sm text-gray-600">Payment Method</p>
                  <p className="font-bold text-blue-700 text-sm sm:text-base">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-3 gap-2">
                <p className="text-xs sm:text-sm text-gray-600">
                  Items: {(order.OrderItems || []).reduce((sum, it) => sum + (it.quantity || 0), 0)}
                </p>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  Total: Rs. {order.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
