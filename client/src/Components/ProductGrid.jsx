import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    );
}
export default ProductGrid;