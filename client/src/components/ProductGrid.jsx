import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {  // Receives array of products, defaults to empty array
    return (
        // Grid container - responsive columns (1 on mobile, 2 on sm, 3 on lg, 4 on xl)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Loop through each product and create a ProductCard */}
            {products.map((item) => (
                <ProductCard 
                    key={item.id}      // Unique key for React (prevents warnings)
                    product={item}     // Pass entire product object to card
                />
            ))}
        </div>
    );
}

export default ProductGrid;