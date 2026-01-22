import { Link } from "react-router-dom"; // Don't forget this import!

function ProductCard({ product }) {
    // Handle image URL - use uploaded image or placeholder
    const imageUrl = product.image 
        ? `http://localhost:5000/uploads/${product.image}` 
        : "https://placehold.co/400x300?text=No+Image";

    return (
        /* 1. WRAP EVERYTHING IN A LINK */
        /* Use backticks for the URL to inject the product.id */
        <Link to={`/product/${product.id}`} className="block">
            <div className="w-full bg-white p-4 rounded-lg cursor-pointer shadow hover:shadow-lg transition">
                
                {/* Product Image with error handling */}
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/400x300?text=No+Image";
                    }}
                />

                {/* Product Name */}
                <h3 className="font-semibold mt-2">{product.name}</h3>
                
                {/* Product Price */}
                <p className="text-blue-600 font-bold">Rs. {product.price}</p>

                {/* Product Rating */}
                <div className="text-sm text-gray-500 mt-1">
                    ⭐ {product.rating}
                </div>

                {/* Product Category */}
                <div className="text-xs text-gray-400 mt-1">
                    {product.category}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;