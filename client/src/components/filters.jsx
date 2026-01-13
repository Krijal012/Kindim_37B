import { useState } from "react";

function Filters({ products, setFilteredProducts }) {
    const categories = [
        "All",
        "Beauty Products",
        "Clothing",
        "Decorations",
        "Electronics",
        "Music",
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const ratings = ["4+", "3+", "2+", "1+"];

    const handleCategory = (cat) => {
        setSelectedCategory(cat);
        if (cat === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === cat));
        }
    };

    return (
        <div className="font-sans p-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Category */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Category</h3>
                {categories.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm mb-1 cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === c}
                            onChange={() => handleCategory(c)}
                        />
                        {c}
                    </label>
                ))}
            </div>

            {/* Rating */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Minimum Rating</h3>
                {ratings.map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm mb-1 cursor-pointer">
                        <input type="radio" name="rating" />
                        {r} Stars
                    </label>
                ))}
            </div>

            <button
                onClick={() => {
                    setFilteredProducts(products);
                    setSelectedCategory("All");
                }}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default Filters;
