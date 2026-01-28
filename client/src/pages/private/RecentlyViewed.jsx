import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useApi } from "../../hooks/useAPI";
import { toast } from "react-toastify";

export default function RecentlyViewed() {
  const [products, setProducts] = useState([]);
  const { loading, callApi } = useApi();

  useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  const fetchRecentlyViewed = async () => {
    try {
      const res = await callApi("GET", "/api/recently-viewed");
      setProducts(res.data || res || []);
    } catch (err) {
      console.error("Error fetching recently viewed:", err);
      toast.error("Failed to load recently viewed products");
    }
  };

  const handleClearAll = async () => {
    try {
      await callApi("DELETE", "/api/recently-viewed");
      setProducts([]);
      toast.success("Recently viewed cleared");
    } catch (err) {
      console.error("Error clearing recently viewed:", err);
      toast.error("Failed to clear recently viewed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Recently Viewed Products
        </h2>

        {products.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg mb-4">No recently viewed products yet.</p>
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 font-semibold hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
