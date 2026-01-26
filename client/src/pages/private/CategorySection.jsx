import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategoryBar from "../../components/CategoryBar";
import ProductGrid from "../../components/ProductGrid";

function CategorySection({ onLogout }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [priceRange, setPriceRange] = useState(125000);
  const [selectedRating, setSelectedRating] = useState('All Stars');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");

  // Fetch products from database
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Build URL with search query if exists
        const url = searchQuery 
          ? `http://localhost:5000/api/products?search=${encodeURIComponent(searchQuery)}`
          : 'http://localhost:5000/api/products';
        
        const response = await fetch(url);

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
  }, [searchQuery]);

  // Update search query from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Filter products (client-side filtering for category, price, rating)
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (parseFloat(product.price) > parseFloat(priceRange)) return false;

    if (selectedRating && selectedRating !== 'All Stars') {
      const ratingNumber = parseInt(selectedRating.split(' ')[0]);
      const productRating = parseFloat(product.rating);
      if (productRating < ratingNumber || productRating >= ratingNumber + 1) return false;
    }

    return true;
  });

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleLogout = () => {
    onLogout();
    handleClearFilters();
    navigate("/login", { replace: true });
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(125000);
    setSelectedRating('All Stars');
    setSearchQuery("");
    navigate('/products', { replace: true });
  };

  return (
    <>
      <Header
        show={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => {}}
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
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                {searchQuery ? (
                  <>
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-800 text-xl font-semibold mb-2">
                      No products found for "{searchQuery}"
                    </p>
                    <p className="text-gray-600 mb-4">
                      Try searching with different keywords or clear filters
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-800 text-xl font-semibold mb-2">
                      No products match your filters
                    </p>
                  </>
                )}
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-gray-600">
                    {searchQuery ? (
                      <>Showing {filteredProducts.length} results for <span className="font-semibold">"{searchQuery}"</span></>
                    ) : (
                      <>Showing {filteredProducts.length} products</>
                    )}
                  </p>
                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      onClick={handleClearFilters}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                <ProductGrid
                  products={filteredProducts}
                  onProductClick={handleProductClick}
                />
              </>
            )}
          </div>

        </div>
      </main>

      <Footer show={true} />
    </>
  );
}

export default CategorySection;