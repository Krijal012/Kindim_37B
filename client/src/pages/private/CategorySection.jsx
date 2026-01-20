import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategoryBar from "../../components/CategoryBar";
import ProductGrid from "../../components/ProductGrid";
import Products from "../../data/Product"; // Import the array of 15 products

function CategorySection({ onLogout }) {
  const { category } = useParams();
  const navigate = useNavigate(); // For redirecting after logout

  // State
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [priceRange, setPriceRange] = useState(125000);
  const [selectedRating, setSelectedRating] = useState('All Stars');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // Filter products
  const filteredProducts = Products.filter((product) => {
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
    onLogout(); // clear authentication/session
    // Reset filters
    setSelectedCategory('All');
    setPriceRange(125000);
    setSelectedRating('All Stars');
    setSearchQuery("");
    setSearchSubmitted(false);
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Header
        show={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => setSearchSubmitted(true)}
        onLogout={handleLogout} // Use fixed logout handler
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
            {filteredProducts.length === 0 && searchSubmitted ? (
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
