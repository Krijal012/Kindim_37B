import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI.js";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdsBoard from "../../components/ads.jsx";
import Categories from "../../components/catagaries.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";

// Random products by category function
function getRandomProductsByCategory(products) {
  const categories = {};

  // Group products by category
  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  // Pick one random product from each category
  return Object.values(categories).map((items) => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  });
}

export default function DashBoard({ onLogout }) {
  const navigate = useNavigate();
  const { callApi, loading } = useApi();
  const [dbProducts, setDbProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const fetchLiveProducts = async () => {
    try {
      const res = await callApi("GET", "/api/products");
      console.log("1. FULL RESPONSE:", res);
      console.log("2. DATA CONTENT:", res.data);

      // Some APIs wrap data: res.data.products or res.data.data
      const actualProducts = Array.isArray(res) ? res : (res?.data || []);
      setDbProducts(actualProducts || []);

      // ✅ Generate random product recommendations from each category
      if (actualProducts && actualProducts.length > 0) {
        const recommended = getRandomProductsByCategory(actualProducts);
        setRecommendedProducts(recommended);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchLiveProducts();
  }, []);

  // Scroll logic
  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;
      setShowHeader(currentScroll < lastScrollY);
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowFooter(atBottom);
      setLastScrollY(currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header show={showHeader} onLogout={handleLogout} />

      <main className="mt-[112px] px-6 bg-white space-y-10 pb-20">
        {/* Ads Board */}
        <div className="h-96 w-full rounded-lg">
          <AdsBoard />
        </div>

        {/* Categories */}
        <Categories />

        {/* Compare Products Button */}
        <div className="flex justify-center my-6">
          <button
            onClick={() => navigate("/compare")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
            Compare Products
          </button>
        </div>

        {/* Recommended Products Section */}
        {recommendedProducts.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Recommended for You
              </h2>
              <button
                onClick={() => navigate("/products")}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View All →
              </button>
            </div>
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading recommendations...</p>
              </div>
            ) : (
              <ProductGrid
                products={recommendedProducts}
                onProductClick={(product) =>
                  navigate(`/product/${product.id}`)
                }
              />
            )}
          </div>
        )}

        {/* All Products Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
            <button
              onClick={() => navigate("/products")}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View All →
            </button>
          </div>
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : dbProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products available yet.</p>
            </div>
          ) : (
            <ProductGrid
              products={dbProducts}
              onProductClick={(product) =>
                navigate(`/product/${product.id}`)
              }
            />
          )}
        </div>
      </main>

      <Footer show={showFooter} />
    </div>
  );
}