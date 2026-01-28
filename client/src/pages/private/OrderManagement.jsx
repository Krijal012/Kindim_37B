import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useAPI'; // Use your custom hook

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const { callApi, loading, error } = useApi();

  const fetchOrders = async () => {
    try {
      const role = localStorage.getItem("userRole");
      const endpoint = role === "admin" ? "/api/orders/all" : "/api/orders/seller-orders";

      const res = await callApi("GET", endpoint);
      // Both endpoints now return { data: [...] }
      setOrders(res.data || []);
    } catch (err) {
      // Error is handled by the useApi state
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-12 text-blue-600 animate-pulse font-bold">Loading orders...</div>;
  if (error) return <div className="text-center mt-12 text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Order Management</h2>

      <div className="bg-white rounded-2xl sm:rounded-[20px] p-4 sm:p-8 min-h-[400px] shadow-sm border border-gray-100 overflow-x-auto">
        {orders.length === 0 ? (
          <p className="text-center text-gray-400 italic py-20">No orders found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-bottom border-gray-200 text-gray-600 uppercase text-xs font-bold">
                <th className="p-3">ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-500">#{order.id.slice(0, 5)}</td>
                  <td className="p-4 text-gray-700 font-medium">{order.buyer?.username || "Guest"}</td>
                  <td className="p-4 text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-black text-gray-800">Rs. {order.totalPrice}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => alert(`Viewing details for order ${order.id}`)}
                      className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;