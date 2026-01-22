export default function OrderHistoryItem({ order }) {
  const handleBuyAgain = () => {
    // Add logic to add item back to cart
    console.log("Buy again:", order.id);
  };

  return (
    <div className="bg-white rounded-lg shadow flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-300 rounded-md overflow-hidden">
          {order.image && (
            <img 
              src={order.image} 
              alt={order.productName}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold">{order.productName}</h3>
          <p className="text-sm text-gray-500">{order.price}</p>
        </div>
      </div>
      <button 
        onClick={handleBuyAgain}
        className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors"
      >
        Buy Again
      </button>
    </div>
  );
}