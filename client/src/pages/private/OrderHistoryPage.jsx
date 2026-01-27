import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useApi } from "../../hooks/useAPI";

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const { callApi, loading } = useApi();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await callApi("GET", "/api/orders");
        const data = res?.data || res || [];

        // UI expects a flat list of ordered items, not grouped orders.
        const formattedOrders = (Array.isArray(data) ? data : []).flatMap((order) =>
          (order.OrderItems || []).map((item) => ({
            id: `${order.id}-${item.id}`,
            productName: item.productName,
            price: `Rs. ${item.price}`,
            image: item?.Product?.image
              ? `http://localhost:5000/uploads/${item.Product.image}`
              : null,
          }))
        );
        setOrders(formattedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, [callApi]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 mt-20 min-h-screen bg-gray-100">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading order history...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const filteredOrders = orders.filter(order =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 mt-20 min-h-screen bg-gray-100">
        <h2 className="text-xl font-semibold text-center mb-6">
          Order History
        </h2>
        <div className="mb-6 flex justify-start">
          <input
            type="text"
            placeholder="Search Orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 border rounded-md px-4 py-2 outline-none"
          />
        </div>
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No orders found</div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  {order.image ? (
                    <img src={order.image} alt={order.productName} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{order.productName}</p>
                  <p className="text-gray-600 text-sm">{order.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}