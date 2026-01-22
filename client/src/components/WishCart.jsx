export function CartItem({ item, onRemove, addItemToCart }) {
  const handleAddToCart = () => {
    addItemToCart(item);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="bg-[#f2f2f2] rounded-lg p-4 flex justify-between items-center gap-7">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      {/* Info */}
      <div className="flex-1 px-2">
        <h2 className="font-bold text-black">{item.name}</h2>
        <p className="text-gray-700">Rs. {item.price}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className="p-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 bg-red-600 text-white rounded-2xl hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
