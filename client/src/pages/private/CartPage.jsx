import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { toast } from "react-toastify";
import Cart from "../../components/Cart";
import  Header  from '../../components/Header';
import  Footer  from '../../components/Footer';

function CartPage() {
    const navigate = useNavigate();
    const { loading, callApi } = useApi();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, [callApi]);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const res = await callApi("GET", "/api/cart");

            setCartItems(res.data || []);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        }
    };

    const updateQuantity = async (cartId, change) => {
        const item = cartItems.find(item => item.id === cartId);
        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return;

        try {
            await callApi("PUT", `/api/cart/${cartId}`, { quantity: newQuantity });

            setCartItems(cartItems.map(item =>
                item.id === cartId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    };

    const handleRemove = async (cartId) => {
        if (!window.confirm("Remove this item from cart?")) return;

        try {
            await callApi("DELETE", `/api/cart/${cartId}`);

            setCartItems(cartItems.filter(item => item.id !== cartId));
            toast.info("Item removed from cart");
        } catch (err) {
            console.error("Failed to remove item:", err);
            toast.error("Failed to remove item.");
        }
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.Product ? item.Product.price : item.price;
        return sum + (parseFloat(price) * item.quantity);
    }, 0);

    if (loading) {
        return (
            <>
                <Header />
                <main className="bg-gray-50 py-10 mt-20 min-h-screen">
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading cart...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="bg-gray-50 py-10 mt-20 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl text-left font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                                <Cart
                                    cartItems={cartItems}
                                    updateQuantity={updateQuantity}
                                    handleRemove={handleRemove}
                                />
                            </div>
                            <div className="w-full lg:w-96">
                                <div className="bg-white p-6 rounded-2xl shadow border sticky top-24">
                                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                                    <div className="border-t pt-3 mt-3 space-y-2">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Subtotal</span>
                                            <span className="text-blue-600">Rs. {subtotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate("/checkout")}
                                        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default CartPage;