import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductDetail = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, callApi } = useApi();
  const [product, setProduct] = useState(null);

  // State for selections
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchQuestions();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await callApi("GET", `/api/products/${id}`);
      setProduct(res.data || res);

      // Only check wishlist if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        checkWishlistStatus();
        addToRecentlyViewed();
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      toast.error("Failed to load product details");
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await callApi("GET", `/api/questions/product/${id}`);
      setQuestions(Array.isArray(res) ? res : (res.data || []));
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!newQuestion.trim()) {
      toast.warning("Please type a question");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to ask a question");
      navigate("/login");
      return;
    }

    try {
      setSubmittingQuestion(true);
      await callApi("POST", "/api/questions", {
        productId: parseInt(id),
        question: newQuestion
      });
      setNewQuestion("");
      toast.success("Question submitted successfully!");
      fetchQuestions(); // Refresh questions
    } catch (err) {
      console.error("Error submitting question:", err);
      toast.error(err.message || "Failed to submit question");
    } finally {
      setSubmittingQuestion(false);
    }
  };

  const addToRecentlyViewed = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await callApi("POST", "/api/recently-viewed", { productId: parseInt(id) });
    } catch (err) {
      console.error("Error adding to recently viewed:", err);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setInWishlist(false);
        setWishlistItemId(null);
        return;
      }

      const res = await callApi("GET", "/api/wishlist");
      const wishlistArray = Array.isArray(res) ? res : (res?.data || []);
      const wishlistItem = wishlistArray.find(item => item.productId === parseInt(id));

      if (wishlistItem) {
        setInWishlist(true);
        setWishlistItemId(wishlistItem.id);
      } else {
        setInWishlist(false);
        setWishlistItemId(null);
      }
    } catch (err) {
      console.error("Error checking wishlist:", err);
      setInWishlist(false);
      setWishlistItemId(null);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    } else {
      toast.warning("Quantity cannot be less than 1");
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      setAddingToCart(true);

      await callApi("POST", "/api/cart", {
        productId: product.id,
        quantity: quantity,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
      });

      toast.success("Product added to cart successfully!");
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      if (err.message === "No token provided" || err.response?.status === 401) {
        toast.warning("Please login to add items to cart");
        navigate("/login");
      } else {
        toast.error(err.message || "Failed to add to cart");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to use wishlist");
      navigate("/login");
      return;
    }

    try {
      setAddingToWishlist(true);

      if (inWishlist) {
        // Remove from wishlist
        if (wishlistItemId) {
          await callApi("DELETE", `/api/wishlist/${wishlistItemId}`);
          setInWishlist(false);
          setWishlistItemId(null);
          toast.success("Removed from wishlist");
        }
      } else {
        // Add to wishlist
        const res = await callApi("POST", "/api/wishlist", { productId: product.id });

        // Handle different response structures
        const wishlistItem = res.wishlistItem || res.data?.wishlistItem || res.data || res;

        if (wishlistItem && wishlistItem.id) {
          setInWishlist(true);
          setWishlistItemId(wishlistItem.id);
          toast.success("Added to wishlist!");
        } else {
          throw new Error("Invalid response format");
        }
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      if (err.message === "No token provided" || err.response?.status === 401) {
        toast.warning("Please login to use wishlist");
        navigate("/login");
      } else {
        toast.error(err.message || "Failed to update wishlist");
      }
    } finally {
      setAddingToWishlist(false);
    }
  };

  const colors = [
    { name: "Blue", hex: "#3B82F6" },
    { name: "Black", hex: "#1F2937" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#EF4444" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" }
  ];

  if (loading) {
    return (
      <>
        <Header onLogout={onLogout} />
        <main className="mt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header onLogout={onLogout} />
        <main className="mt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Product not found</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const imageUrl = product.image
    ? (product.image.startsWith('http') ? product.image : `http://localhost:5000/uploads/${product.image}`)
    : 'https://placehold.co/400?text=No+Image';

  return (
    <>
      <Header onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 mt-16 sm:mt-20 bg-gray-50">

        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-10">

          {/* Product Images */}
          <div className="flex-1">
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 border">
              <img
                src={imageUrl}
                className="w-full h-[300px] sm:h-[400px] object-contain"
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400?text=No+Image';
                }}
              />
            </div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={imageUrl}
                  className="w-20 h-20 rounded-lg border object-cover cursor-pointer hover:border-blue-500"
                  alt="thumbnail"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/80?text=No+Image';
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name}</h1>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-black text-blue-600">Rs. {product.price}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="font-bold text-gray-700">{product.rating || 'N/A'}</span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-bold text-gray-400 uppercase">Color</label>
              <div className="flex gap-3 mt-2">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color.name
                      ? 'border-blue-600 scale-110 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-bold text-gray-400 uppercase">Size</label>
              <div className="flex gap-3 mt-2">
                {['Small', 'Medium', 'Large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-6 py-2 rounded-lg font-medium transition ${selectedSize === size
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="text-sm font-bold text-gray-400 uppercase">Quantity</label>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-200 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="font-bold text-lg min-w-[30px] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-200 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 bg-blue-300 text-blue-900 py-3 rounded-xl font-bold hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? "Adding..." : "Add To Cart"}
              </button>
              <button
                onClick={handleWishlistToggle}
                disabled={addingToWishlist}
                className={`flex-1 border py-3 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${inWishlist
                  ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                  : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {addingToWishlist
                  ? "Processing..."
                  : inWishlist
                    ? "❤️ In Wishlist"
                    : "🤍 Add to Wishlist"
                }
              </button>
            </div>

            <button
              onClick={() => navigate(`/bargain/${product.id}`, { state: { product } })}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              Bargain Here
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-8 bg-gray-200 p-4 sm:p-8 rounded-2xl shadow-inner border border-gray-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
          <div className="bg-white p-4 sm:p-6 rounded-xl">
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {product.description || "No detailed description provided for this product."}
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-gray-600">Category:</span>
                <span className="ml-2 text-gray-800">{product.category}</span>
              </div>
              <div>
                <span className="font-bold text-gray-600">Rating:</span>
                <span className="ml-2 text-gray-800">⭐ {product.rating || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-8 bg-gray-200 p-4 sm:p-8 rounded-2xl shadow-inner border border-gray-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {[
              { name: "John Doe", rating: 5, comment: "Great product! Highly recommended." },
              { name: "Jane Smith", rating: 4, comment: "Good quality, fast delivery." },
              { name: "Mike Johnson", rating: 5, comment: "Exactly as described. Very satisfied!" },
              { name: "Sarah Williams", rating: 4, comment: "Nice product, worth the price." }
            ].map((review, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">{review.name}</span>
                  <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-gray-200 p-4 sm:p-8 rounded-2xl shadow-inner border border-gray-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Questions & Answers</h2>
          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-gray-500 italic p-4 bg-white rounded-xl">No questions yet. Be the first to ask!</p>
            ) : (
              questions.map((qa, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-800">Q: {qa.question}</p>
                    <span className="text-xs text-gray-400 capitalize">{qa.User?.username || 'User'} • {new Date(qa.createdAt).toLocaleDateString()}</span>
                  </div>
                  {qa.answer ? (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-gray-700 font-medium flex items-start gap-2">
                        <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded uppercase mt-1">Answer</span>
                        {qa.answer}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic text-sm mt-3">Waiting for seller's response...</p>
                  )}
                </div>
              ))
            )}

            <div className="mt-6">
              <textarea
                className="w-full bg-white h-24 rounded-xl border border-gray-100 shadow-sm p-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Have a question about this product? Ask the seller here..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleQuestionSubmit}
                  disabled={submittingQuestion || !newQuestion.trim()}
                  className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-400 disabled:shadow-none active:scale-95"
                >
                  {submittingQuestion ? "Submitting..." : "Submit Question"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;