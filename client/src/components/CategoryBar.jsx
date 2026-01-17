function CategoryBar({
    // Props received from parent (CategorySection)
    selectedCategory,      // Current selected category value
    setSelectedCategory,   // Function to update category
    priceRange,           // Current price slider value
    setPriceRange,        // Function to update price
    selectedRating,       // Current selected rating
    setSelectedRating     // Function to update rating
}) {

    // Array of all available categories
    const categories = ['All', 'Beauty Products', 'Clothing', 'Decorations', 'Electronics', 'Music'];
    
    // Array of rating options for filtering
    const ratings = ['All Stars', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

    // Function to reset all filters to default values
    const handleClearFilters = () => {
        setSelectedCategory('All');      // Reset to show all categories
        setPriceRange(125000);            // Reset to maximum price
        setSelectedRating('All Stars');   // Reset to show all ratings
    };

    // Helper function to format price with commas (e.g., 125000 → 125,000)
    const formatPrice = (price) => {
        return parseInt(price).toLocaleString();
    };

    return(
        // Main container for sidebar - responsive width, sticky positioning
        <div className="w-full md:w-64 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200 md:min-h-screen">
            
            {/* Header for filters section */}
            <h2 className="text-xl font-bold mb-6">Filters</h2>

            {/* CATEGORY FILTER SECTION */}
            <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                    {/* Loop through each category and create radio button */}
                    {categories.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded transition">
                            <input
                                type="radio"                           // Radio button (only one can be selected)
                                name="category"                        // Group name (all category radios share this)
                                value={category}                       // Value of this option
                                checked={selectedCategory === category} // Is this option currently selected?
                                onChange={(e) => setSelectedCategory(e.target.value)} // Update when clicked
                                className="w-4 h-4 text-blue-600 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* PRICE RANGE FILTER SECTION */}
            <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">Price Range</h3>
                <input
                    type="range"              // Slider input
                    min="0"                   // Minimum value (Rs. 0)
                    max="125000"              // Maximum value (Rs. 125,000)
                    step="1000"               // Increment by 1000 when dragging
                    value={priceRange}        // Current slider position
                    onChange={(e) => setPriceRange(e.target.value)} // Update as user drags
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                {/* Display min, current, and max prices */}
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Rs. 0</span>
                    <span className="font-semibold text-blue-600">Rs. {formatPrice(priceRange)}</span>
                    <span>Rs. 125,000</span>
                </div>
            </div>

            {/* RATING FILTER SECTION */}
            <div className="mb-8">
                <h3 className="text-base font-semibold mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                    {/* Loop through each rating option and create radio button */}
                    {ratings.map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded transition">
                            <input
                                type="radio"                          // Radio button
                                name="rating"                         // Group name (all rating radios share this)
                                value={rating}                        // Value of this option
                                checked={selectedRating === rating}   // Is this option currently selected?
                                onChange={(e) => setSelectedRating(e.target.value)} // Update when clicked
                                className="w-4 h-4 text-blue-600 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-700">{rating}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* CLEAR FILTERS BUTTON */}
            <button
                onClick={handleClearFilters}  // Reset all filters when clicked
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 active:scale-95 transition-all"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default CategoryBar;