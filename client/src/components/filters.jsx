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
        <div className="font-sans p-3 sm:p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Filters</h2>

            {/* Category */}
            <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Category</h3>
                <div className="space-y-1 sm:space-y-1.5">
                    {categories.map((c) => (
                        <label
                            key={c}
                            className="flex items-center gap-2 text-xs sm:text-sm mb-1 cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded transition"
                        >
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === c}
                                onChange={() => handleCategory(c)}
                                className="w-4 h-4 accent-blue-600"
                            />
                            <span className={selectedCategory === c ? "font-semibold" : ""}>
                                {c}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Minimum Rating</h3>
                <div className="space-y-1 sm:space-y-1.5">
                    {ratings.map((r) => (
                        <label
                            key={r}
                            className="flex items-center gap-2 text-xs sm:text-sm mb-1 cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded transition"
                        >
                            <input
                                type="radio"
                                name="rating"
                                className="w-4 h-4 accent-blue-600"
                            />
                            <span>{r} Stars</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={() => {
                    setFilteredProducts(products);
                    setSelectedCategory("All");
                }}
                className="w-full bg-blue-600 text-white py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default Filters;