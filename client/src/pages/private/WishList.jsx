// src/pages/private/WishlistPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function WishlistPage() {
    const navigate = useNavigate();
    const { loading, callApi } = useApi();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const fetchWishlistItems = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const res = await callApi("GET", "/api/wishlist");

            const items = Array.isArray(res) ? res : (res?.data ? res.data : []);
            setWishlistItems(items);
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
            setWishlistItems([]);
        }
    };

    const handleRemove = async (wishlistId) => {
        if (!window.confirm("Remove this item from wishlist?")) return;

        try {
            await callApi("DELETE", `/api/wishlist/${wishlistId}`);

            setWishlistItems(wishlistItems.filter(item => item.id !== wishlistId));
            toast.info("Item removed from wishlist");
        } catch (err) {
            console.error("Failed to remove item:", err);
            toast.error("Failed to remove item.");
        }
    };

    const handleAddToCart = async (item) => {
        try {
            if (!item.Product) {
                toast.error("Product information not available");
                return;
            }

            await callApi("POST", "/api/cart", {
                productId: item.Product.id,
                quantity: 1,
                selectedColor: "Blue",
                selectedSize: "Medium"
            });

            toast.success(`${item.Product.name} added to cart!`);
            await handleRemove(item.id);
        } catch (err) {
            console.error("Failed to add to cart:", err);
            if (err.message === "No token provided") {
                toast.warn("Please login to add items to your cart.");
                navigate("/login");
            } else {
                toast.error("Failed to add to cart.");
            }
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="bg-gray-50 py-10 mt-20 min-h-screen">
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading wishlist...</p>
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
                    <h1 className="text-3xl text-left font-bold text-gray-900 mb-8">Your Wishlist</h1>

                    {!Array.isArray(wishlistItems) || wishlistItems.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="space-y-4">
                                {wishlistItems.map((item) => (
                                    <WishlistItem
                                        key={item.id}
                                        item={item}
                                        onRemove={handleRemove}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="light"
            />
        </>
    );
}

function WishlistItem({ item, onRemove, onAddToCart }) {
    const product = item.Product;

    if (!product) {
        return null;
    }

    const imageUrl = product.image
        ? (product.image.startsWith('http') ? product.image : `http://localhost:5000/uploads/${product.image}`)
        : 'https://placehold.co/150?text=No+Image';

    return (
        <div className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
            <div className="flex-shrink-0">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/96?text=No+Image';
                    }}
                />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center gap-3">
                    <p className="text-xl font-bold text-blue-600">Rs. {product.price}</p>
                    {product.rating && (
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    onClick={() => onAddToCart(item)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition min-w-[140px]"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => onRemove(item.id)}
                    className="border border-red-300 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default WishlistPage;