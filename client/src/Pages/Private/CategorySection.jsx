import { useState } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/footer";
import CategoryBar from "../../Components/CategoryBar";
import ProductGrid from "../../Components/ProductGrid";
import products from "../../Data/Product";

function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(150000);
  const [selectedRating, setSelectedRating] = useState('');

  const filteredProducts = products.filter((product) => {
    // Category Filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    // Price Filter
    if (product.price > priceRange) {
      return false;
    }
    // Rating Filter
    if (selectedRating) {
      const ratingValue = parseFloat(selectedRating);
      if (selectedRating !== 'All Stars' && product.rating < ratingValue) {
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
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            priceRange={priceRange} setPriceRange={setPriceRange}
            selectedRating={selectedRating} setSelectedRating={setSelectedRating}
          />

          {/* Right Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
          </>
  );
}

export default CategorySection;