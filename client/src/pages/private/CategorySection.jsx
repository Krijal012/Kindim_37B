import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import CategoryBar from "../../Components/CategoryBar";
import ProductGrid from "../../Components/ProductGrid";
import Products from "../../data/Product";

function CategorySection() {
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(125000);
  const [selectedRating, setSelectedRating] = useState('All Stars');

  const filteredProducts = Products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    
    if (parseFloat(product.price) > parseFloat(priceRange)) {
      return false;
    }
    
    if (selectedRating && selectedRating !== 'All Stars') {
      const ratingNumber = parseInt(selectedRating.split(' ')[0]);
      const productRating = parseFloat(product.rating);
      
      if (productRating < ratingNumber || productRating >= ratingNumber + 1) {
        return false;
      }
    }
    
    return true;
  });

  // ✅ Handle product click to navigate to detail page
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Header />

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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No products found matching your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(125000);
                    setSelectedRating('All Stars');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {filteredProducts.length} of {Products.length} products
                </div>
                
                {/* ✅ Pass handleProductClick to ProductGrid */}
                <ProductGrid 
                  products={filteredProducts} 
                  onProductClick={handleProductClick}
                />
              </>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default CategorySection;