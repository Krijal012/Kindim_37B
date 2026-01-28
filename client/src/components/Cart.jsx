// Cart.jsx
function Cart({ cartItems, updateQuantity, handleRemove }) {
    return (
        <div className="space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                        src={`http://localhost:5000/uploads/${item.Product.image}`}
                        className="w-full sm:w-20 md:w-24 h-48 sm:h-20 md:h-24 rounded-lg object-cover border mx-auto sm:mx-0"
                        alt={item.Product.name}
                        onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"}
                    />

                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.Product.name}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">{item.Product.category}</p>

                        {item.selectedColor && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Color: {item.selectedColor}</p>
                        )}
                        {item.selectedSize && (
                            <p className="text-xs sm:text-sm text-gray-600">Size: {item.selectedSize}</p>
                        )}

                        <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-gray-200 px-2 sm:px-3 py-1 rounded-lg font-bold hover:bg-gray-300 transition text-sm sm:text-base"
                            >
                                -
                            </button>
                            <span className="font-bold text-base sm:text-lg">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-gray-200 px-2 sm:px-3 py-1 rounded-lg font-bold hover:bg-gray-300 transition text-sm sm:text-base"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-center sm:text-right flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                        <p className="text-xl sm:text-2xl font-bold text-blue-600">
                            Rs. {(parseFloat(item.Product.price) * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700 font-semibold mt-0 sm:mt-4 transition text-sm sm:text-base"
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