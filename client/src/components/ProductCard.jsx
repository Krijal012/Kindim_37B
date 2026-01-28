import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const imageUrl = product?.image
    ? (product.image.startsWith('http')
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`)
    : 'https://placehold.co/150?text=No+Image';

  return (
    <Link
      to={`/product/${product?.id}`}
      className="border rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 block bg-white"
    >
      <div className="relative bg-gray-100 p-3 sm:p-4 flex items-center justify-center h-40 sm:h-48">
        <img
          src={imageUrl}
          alt={product?.name}
          className="w-full h-full object-contain mix-blend-multiply"
          onError={(e) => {
            e.target.src = 'https://placehold.co/150?text=No+Image';
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Add to cart");
          }}
          className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-blue-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="p-3 sm:p-4 text-xs sm:text-sm flex flex-col justify-between h-28 sm:h-32">
        <p className="font-medium text-gray-800 text-sm sm:text-base">Rs. {product.price}</p>
        <p className="text-gray-600 truncate text-xs sm:text-sm">{product.name}</p>

        <div className="flex mt-1 sm:mt-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xs sm:text-sm ${i < product.rating ? "text-green-500" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}