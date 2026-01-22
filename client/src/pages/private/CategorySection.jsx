import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategoryBar from "../../components/CategoryBar";
import ProductGrid from "../../components/ProductGrid";

function CategorySection({ onLogout }) {
  const { category } = useParams();
  const navigate = useNavigate();

  // State for products from database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [priceRange, setPriceRange] = useState(125000);
  const [selectedRating, setSelectedRating] = useState('All Stars');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // Fetch products from database
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products'); // Update this to your actual API endpoint
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (parseFloat(product.price) > parseFloat(priceRange)) return false;

    if (selectedRating && selectedRating !== 'All Stars') {
      const ratingNumber = parseInt(selectedRating.split(' ')[0]);
      const productRating = parseFloat(product.rating);
      if (productRating < ratingNumber || productRating >= ratingNumber + 1) return false;
    }

    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    return true;
  });

  // Handle logout
  const handleLogout = () => {
    onLogout();
    setSelectedCategory('All');
    setPriceRange(125000);
    setSelectedRating('All Stars');
    setSearchQuery("");
    setSearchSubmitted(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Header
        show={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => setSearchSubmitted(true)}
        onLogout={handleLogout}
      />

      <main className="bg-gray-50 py-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6">

          <CategoryBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <div className="flex-1">
            {/* Loading state */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              /* Error state */
              <div className="text-center py-20">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 && searchSubmitted ? (
              /* No results */
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">
                  No products found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(125000);
                    setSelectedRating('All Stars');
                    setSearchQuery("");
                    setSearchSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Display products */
              <ProductGrid products={filteredProducts} />
            )}
          </div>

        </div>
      </main>

      <Footer show={true} />
    </>
  );
}

export default CategorySection;