function CategoryBar({
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating
}) {

    const categories = ['All', 'Beauty Products', 'Clothing', 'Decorations', 'Electronics', 'Music'];
    const ratings = ['4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars', 'All Stars'];

    const handleClearFilters = () => {
        setSelectedCategory('All');
        setPriceRange(150000);
        setSelectedRating('');
    };

    return(
        <div className="w-full md:w-64 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200 md:min-h-screen">
            {/* Filters Header */}
            <h2 className="text-xl font-bold mb-6">Filters</h2>

            {/* Category Section */}
            <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Section */}
            <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max="150000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Rs. 0</span>
                    <span>Rs. {priceRange}</span>
                    <span>Rs. 150000</span>
                </div>
            </div>

            {/* Minimum Rating Section */}
            <div className="mb-8">
                <h3 className="text-base font-semibold mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                    {ratings.map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={selectedRating === rating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">{rating}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Clear Filters Button */}
            <button
                onClick={handleClearFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default CategoryBar;