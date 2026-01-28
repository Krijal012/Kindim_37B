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

// PaymentMethod.jsx
import { toast } from "react-toastify";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Payment Method</h2>

            <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
                    <input
                        type="radio"
                        name="payment"
                        value="CASH"
                        checked={paymentMethod === "CASH"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5"
                    />
                    <div>
                        <p className="font-semibold text-sm sm:text-base">Cash on Delivery</p>
                        <p className="text-xs sm:text-sm text-gray-600">Pay with cash when your order arrives</p>
                    </div>
                </label>

                <label className="flex items-start gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
                    <input
                        type="radio"
                        name="payment"
                        value="QR"
                        checked={paymentMethod === "QR"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5"
                    />
                    <div>
                        <p className="font-semibold text-sm sm:text-base">QR Payment</p>
                        <p className="text-xs sm:text-sm text-gray-600">Pay using QR code (eSewa, Khalti, etc.)</p>
                    </div>
                </label>

                <label className="flex items-start gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
                    <input
                        type="radio"
                        name="payment"
                        value="CARD"
                        checked={paymentMethod === "CARD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5"
                    />
                    <div>
                        <p className="font-semibold text-sm sm:text-base">Debit/Credit Card</p>
                        <p className="text-xs sm:text-sm text-gray-600">Pay securely with your card</p>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default PaymentMethod;

// Payment.jsx (history)
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";

export default function Payment() {
    const { callApi, loading } = useApi();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await callApi("GET", "/api/orders");
                setOrders(res?.data || res || []);
            } catch (err) {
                console.error("Payments fetch error:", err);
                setOrders([]);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Payments</h2>

            {loading ? (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading payments...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12 sm:py-20">
                    <p className="text-gray-500 text-base sm:text-lg">No payments yet</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Place an order and it will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Order ID: #{order.id}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
                                    </p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-xs sm:text-sm text-gray-600">Method</p>
                                    <p className="font-bold text-blue-700 text-sm sm:text-base">{order.paymentMethod}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-3 gap-2">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Items: {(order.OrderItems || []).reduce((sum, it) => sum + (it.quantity || 0), 0)}
                                </p>
                                <p className="text-base sm:text-lg font-bold text-gray-900">
                                    Total: Rs. {order.totalPrice}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}