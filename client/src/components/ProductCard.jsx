function ProductCard({ product }) {  // Receives a single product object as prop
    return (
        // Card container - white background, rounded corners, shadow effect
        <div className="w-full bg-white p-4 rounded-lg cursor-pointer shadow hover:shadow-lg transition">
            
            {/* Product Image */}
            <img
                src={product.image}        // Image source from product data
                alt={product.name}         // Alt text for accessibility
                className="w-full h-40 object-cover rounded" // Full width, fixed height, cover to fill space
            />

            {/* Product Name */}
            <h3 className="font-semibold mt-2">{product.name}</h3>
            
            {/* Product Price - in blue, bold */}
            <p className="text-blue-600 font-bold">Rs. {product.price}</p>

            {/* Product Rating - star emoji + rating number */}
            <div className="text-sm text-gray-500 mt-1">
                ⭐ {product.rating}
            </div>
        </div>
    );
}

export default ProductCard;