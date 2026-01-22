import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistoryList({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No orders found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderHistoryItem key={order.id} order={order} />
      ))}
    </div>
  );
}