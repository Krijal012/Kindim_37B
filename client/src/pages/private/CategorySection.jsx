import { useState } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import CategoryBar from "../../Components/CategoryBar";
import ProductGrid from "../../Components/ProductGrid";
import Products from "../../data/Product";  // Import the array of 15 products

function CategorySection() {
  // STATE MANAGEMENT - These values change when user interacts with filters
  const [selectedCategory, setSelectedCategory] = useState('All');        // Currently selected category
  const [priceRange, setPriceRange] = useState(125000);                   // Current max price (slider value)
  const [selectedRating, setSelectedRating] = useState('All Stars');      // Currently selected rating filter

  // FILTER LOGIC - Runs every time filters change
  const filteredProducts = Products.filter((product) => {
    
    // FILTER 1: Category Filter
    // If "All" is selected, skip this check
    // Otherwise, only keep products matching the selected category
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;  // Exclude this product
    }
    
    // FILTER 2: Price Filter
    // Only keep products that cost less than or equal to the slider value
    if (parseFloat(product.price) > parseFloat(priceRange)) {
      return false;  // Exclude this product (too expensive)
    }
    
    // FILTER 3: Rating Filter - EXACT MATCH
    if (selectedRating && selectedRating !== 'All Stars') {
      // Extract the number from "3 Stars" → 3
      const ratingNumber = parseInt(selectedRating.split(' ')[0]);
      
      // Get product's rating as a number
      const productRating = parseFloat(product.rating);
      
      // Check if product rating is within the range
      // e.g., "3 Stars" means rating should be between 3.0 and 3.9
      if (productRating < ratingNumber || productRating >= ratingNumber + 1) {
        return false;  // Exclude this product (rating doesn't match)
      }
    }
    
    // If product passed all filters, include it
    return true;
  });

  return (
    <>
      {/* HEADER - Navigation bar at top */}
      <Header />

      {/* MAIN CONTENT AREA */}
      <main className="bg-gray-50 py-10 mt-20">  {/* Gray background, padding, margin-top to clear fixed header */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6">
          
          {/* LEFT SIDEBAR - Filter controls */}
          <CategoryBar 
            selectedCategory={selectedCategory}              // Pass current category
            setSelectedCategory={setSelectedCategory}        // Pass setter function
            priceRange={priceRange}                          // Pass current price
            setPriceRange={setPriceRange}                    // Pass setter function
            selectedRating={selectedRating}                  // Pass current rating
            setSelectedRating={setSelectedRating}            // Pass setter function
          />

          {/* RIGHT SIDE - Product display area */}
          <div className="flex-1">  {/* flex-1 makes this take remaining space */}
            
            {/* CONDITIONAL RENDERING - Show different UI based on filtered results */}
            {filteredProducts.length === 0 ? (
              // NO PRODUCTS FOUND - Show empty state
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No products found matching your filters</p>
                <button
                  onClick={() => {
                    // Reset all filters to default when clicked
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
              // PRODUCTS FOUND - Show count and grid
              <>
                {/* Product count display */}
                <div className="mb-4 text-gray-600">
                  Showing {filteredProducts.length} of {Products.length} products
                </div>
                
                {/* Grid of product cards */}
                <ProductGrid products={filteredProducts} />  {/* Pass filtered products to grid */}
              </>
            )}
          </div>

        </div>
      </main>

      {/* FOOTER - Bottom section */}
      <Footer />
    </>
  );
}

export default CategorySection;