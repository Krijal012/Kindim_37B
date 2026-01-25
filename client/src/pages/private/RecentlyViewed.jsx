import { useState } from "react";
import { products as initialProducts } from "../../data/product";
import ProductCard from "../../components/ProductCard";

export default function RecentlyViewed() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6 mt-4">
  <h2 className="text-lg font-semibold ">
    Recently Viewed Products
  </h2>

  <button
    onClick={() => setProducts([])}
    className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800"
  >
    Clear All
  </button>
</div>


      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No recently viewed products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
