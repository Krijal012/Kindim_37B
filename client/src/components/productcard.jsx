function ProductCard({ product }) {
    return (
        <div className="bg-white p-4 rounded-lg cursor-pointer shadow hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
            />

            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-blue-600 font-bold">Rs. {product.price}</p>

            <div className="text-sm text-gray-500 mt-1">
                ⭐ {product.rating}
            </div>
        </div>
    );
}

export default ProductCard;
