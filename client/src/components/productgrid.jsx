import ProductCard from "./ProductCard";

function ProductGrid({ products, onAddToCart, onAddToWishlist }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                />
            ))}
        </div>
    );
}

export default ProductGrid;