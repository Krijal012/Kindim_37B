export default function ProductCard({ product, onProductClick }) {
  return (
    <div
      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onProductClick && onProductClick(product)}
    >
      <div className="relative bg-gray-100 p-4 flex items-center justify-center h-40">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="max-h-full object-contain"
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when adding to cart
            // TODO: Implement add to cart logic
            console.log("Add to cart clicked for", product.name);
          }}
          className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="p-4 text-sm flex flex-col justify-between h-32">
        <p className="font-medium text-gray-800">{product.price}</p>
        <p className="text-gray-600 truncate">{product.name}</p>

        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < product.rating ? "text-green-500" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}