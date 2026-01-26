import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // FIX: Add full URL path for images
  const imageUrl = product.image?.startsWith('http') 
    ? product.image 
    : `http://localhost:5000/uploads/${product.image}`;

  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 block"
    >
      <div className="relative bg-cyan-400 p-4 flex items-center justify-center h-40">
        <img
          src={imageUrl}
          alt={product.name}
          className="max-h-full object-contain"
          onError={(e) => {
            // Fallback image if loading fails
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault(); // IMPORTANT
            e.stopPropagation();
            console.log("Add to cart");
          }}
          className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="p-4 text-sm flex flex-col justify-between h-32">
        <p className="font-medium text-gray-800">Rs. {product.price}</p>
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
    </Link>
  );
}