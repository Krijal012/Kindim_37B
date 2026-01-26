export function OrderItem({ item }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0">
          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />}
        </div>
        <div>
          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
          <h3 className="font-bold">{item.name}</h3>
        </div>
      </div>
      <p className="font-bold">{item.price}</p>
    </div>
  );
}
