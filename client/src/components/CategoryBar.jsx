// CategoryBar.jsx
import React from 'react';

const CategoryBar = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
}) => {
  const categories = ['All', 'Beauty Products', 'Clothing', 'Decorations', 'Electronics', 'Music'];
  const ratings = ['All Stars', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

  return (
    <aside className="w-full md:w-64 bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
      {/* Category Filter */}
      <div className="mb-4 sm:mb-8">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Categories</h3>
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap md:w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${selectedCategory === cat
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs sm:text-sm text-gray-600">
            <span>Rs. 0</span>
            <span className="font-semibold text-blue-600">Rs. {priceRange}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Rating</h3>
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`whitespace-nowrap md:w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${selectedRating === rating
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {rating}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CategoryBar;