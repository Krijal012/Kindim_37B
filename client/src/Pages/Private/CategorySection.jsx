import { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import CategoryBar from "../../Components/CategoryBar";
import ProductGrid from "../../Components/ProductGrid";

function CategorySection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(150000);
  const [selectedRating, setSelectedRating] = useState('');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();

        // Fix image paths if they are just filenames
        const productsWithImages = data.map(product => ({
          ...product,
          image: product.image && !product.image.startsWith('http') && !product.image.startsWith('/')
            ? `/images/${product.image}` 
            : product.image
        }));
        setProducts(productsWithImages);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Category Filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    
    // Price Filter
    if (parseFloat(product.price) > parseFloat(priceRange)) {
      return false;
    }
    
    // Rating Filter
    if (selectedRating && selectedRating !== 'All Stars') {
      const minRating = parseFloat(selectedRating.split('+')[0]);
      if (parseFloat(product.rating) < minRating) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <>
      {/* Top Navigation */}
      <Header />

      {/* Main Content */}
      <main className="bg-gray-50 py-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6">
          
          {/* Left Filter Sidebar */}
          <CategoryBar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange} 
            setPriceRange={setPriceRange}
            selectedRating={selectedRating} 
            setSelectedRating={setSelectedRating}
          />

          {/* Right Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 font-semibold">Error: {error}</p>
                <p className="text-gray-600 mt-2">Make sure your backend server is running on port 5000</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No products found matching your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(150000);
                    setSelectedRating('');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                <ProductGrid products={filteredProducts} />
              </>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default CategorySection;