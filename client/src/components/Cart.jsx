function Cart({ cartItems, updateQuantity, handleRemove }) {
    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border flex gap-6">
                    <img
                        src={`http://localhost:5000/uploads/${item.Product.image}`}
                        className="w-24 h-24 rounded-lg object-cover border"
                        alt={item.Product.name}
                        onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"}
                    />

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{item.Product.name}</h3>
                        <p className="text-gray-600 text-sm">{item.Product.category}</p>

                        {item.selectedColor && (
                            <p className="text-sm text-gray-600 mt-1">Color: {item.selectedColor}</p>
                        )}
                        {item.selectedSize && (
                            <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                        )}

                        <div className="flex items-center gap-4 mt-4">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                                -
                            </button>
                            <span className="font-bold text-lg">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                            Rs. {(parseFloat(item.Product.price) * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700 font-semibold mt-4 transition"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cart;