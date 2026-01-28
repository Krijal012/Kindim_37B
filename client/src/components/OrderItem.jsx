export function OrderItem({ item }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg gap-3">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded flex-shrink-0">
          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500">Qty: {item.qty}</p>
          <h3 className="font-bold text-sm sm:text-base truncate">{item.name}</h3>
        </div>
      </div>
      <p className="font-bold text-sm sm:text-base whitespace-nowrap">{item.price}</p>
    </div>
  );
}