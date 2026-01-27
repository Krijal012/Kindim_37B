function OrderCard({ order, onBuyAgain }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0">
          {order.image && <img src={order.image} alt={order.name} className="w-full h-full object-cover rounded" />}
        </div>
        <div>
          <h3 className="font-bold text-lg">{order.name}</h3>
          <p className="text-gray-600 text-sm">{order.price}</p>
        </div>
      </div>
      <button 
        onClick={() => onBuyAgain(order)}
        className="px-6 py-2 bg-[#1A73E8] text-white font-semibold rounded-lg hover:bg-[#1557b0] transition"
      >
        buy again
      </button>
    </div>
  );
}

export default OrderCard;