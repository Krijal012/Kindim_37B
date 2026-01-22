import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI"; // Import your hook

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdsBoard from "../../components/ads.jsx";
import Categories from "../../components/catagaries.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";

export default function DashBoard() {
  const navigate = useNavigate();
  const { callApi, loading } = useApi(); 
  const [dbProducts, setDbProducts] = useState([]); 
  
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  
  const fetchLiveProducts = async () => {
  try {
    const res = await callApi("GET", "/api/products");
    console.log("1. FULL RESPONSE:", res); // Check if this exists
    console.log("2. DATA CONTENT:", res.data); // Check if this is an array
    
    // Some APIs wrap data: res.data.products or res.data.data
    const actualProducts = Array.isArray(res.data) ? res.data : res.data.data;
    setDbProducts(actualProducts || []); 
  } catch (err) {
    console.error("Fetch failed:", err);
  }
};
 

  // Scroll logic remains the same...
  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;
      setShowHeader(currentScroll < lastScrollY);
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowFooter(atBottom);
      setLastScrollY(currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen">
      <Header show={showHeader} onLogout={() => console.log("Logout")} />

      <main className="mt-[112px] px-6 bg-white space-y-10">
        <div className="h-96 w-full rounded-lg">
          <AdsBoard />
        </div>

        <Categories />

        {/* ✅ 2. Show loading state or Product Grid with DB data */}
        <div className="mb-10 text-gray-600">
          {loading ? (
            <p className="text-center font-bold">Loading newest products...</p>
          ) : (
            <ProductGrid 
              products={dbProducts} 
              onProductClick={(product) => navigate(`/category/${product.category}`)} 
            />
          )}
        </div>
      </main>

      <Footer show={showFooter} />
    </div>
  );
}