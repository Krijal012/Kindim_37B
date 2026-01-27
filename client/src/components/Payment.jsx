import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";

// Shows payment history (per order) so when you place an order it appears here.
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
    <div className="flex-1 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No payments yet</p>
          <p className="text-gray-400 text-sm mt-2">Place an order and it will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Method</p>
                  <p className="font-bold text-blue-700">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <p className="text-sm text-gray-600">
                  Items: {(order.OrderItems || []).reduce((sum, it) => sum + (it.quantity || 0), 0)}
                </p>
                <p className="text-lg font-bold text-gray-900">
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