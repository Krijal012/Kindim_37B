import { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import OrderHistoryList from "../../components/OrderHistoryList";

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock order data - replace with real data from your backend/state management
  const orders = [
    {
      id: 1,
      productName: "Product Name 1",
      price: "$29.99",
      image: "/placeholder1.jpg"
    },
    {
      id: 2,
      productName: "Product Name 2",
      price: "$49.99",
      image: "/placeholder2.jpg"
    }
  ];

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
        <OrderHistoryList orders={filteredOrders} />
      </main>
      <Footer />
    </>
  );
}