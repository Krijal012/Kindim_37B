import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useAPI";

export default function Orders() {
  const navigate = useNavigate();
  const { callApi, loading } = useApi();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await callApi("GET", "/api/orders");
        setOrders(res?.data || res || []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Orders</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading orders...</p>
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="text-gray-500 text-base sm:text-lg">No orders yet</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Order ID: #{order.id}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-3">
                {(order.OrderItems || []).map((item, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-4 items-center pb-3 border-b last:border-b-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {item?.Product?.image && (
                        <img
                          src={`http://localhost:5000/uploads/${item.Product.image}`}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.productName}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-xs sm:text-sm font-bold text-blue-600">Rs. {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                  <p className="text-base sm:text-lg font-bold text-gray-800">
                    Total: Rs. {order.totalPrice}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Payment: {order.paymentMethod}</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-xs sm:text-sm"
                  >
                    View Details
                  </button>
                  {order.status?.toLowerCase() === "delivered" && (
                    <button
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}