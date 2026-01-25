import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import OrderHistoryList from "../../components/OrderHistoryList";
import { useApi } from "../../hooks/useApi";

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const { callApi, loading } = useApi();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await callApi("GET", "/api/orders");
        // The UI expects a flat list of ordered items, not grouped orders.
        // We will flatten the response from the backend.
        const formattedOrders = res.data.flatMap(order =>
          order.OrderItems.map(item => ({
            id: item.id,
            productName: item.Product.name,
            price: `Rs. ${item.price}`,
            image: `http://localhost:5000/uploads/${item.Product.image}`
          }))
        );
        setOrders(formattedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, [callApi]);

  const filteredOrders = orders.filter(order =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <OrderHistoryList orders={filteredOrders} />
      </main>
      <Footer />
    </>
  );
}