function OrderCard({ order, onBuyAgain }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded flex-shrink-0">
          {order.image && <img src={order.image} alt={order.name} className="w-full h-full object-cover rounded" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg truncate">{order.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">{order.price}</p>
        </div>
      </div>
      <button
        onClick={() => onBuyAgain(order)}
        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#1A73E8] text-white font-semibold rounded-lg hover:bg-[#1557b0] transition text-sm sm:text-base"
      >
        Buy Again
      </button>
    </div>
  );
}

export default OrderCard;