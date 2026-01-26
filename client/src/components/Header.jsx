import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo-icon.png";

export default function Header({
  show = true,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onLogout,
  hideSearch = false
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products for autocomplete
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    setQuery(searchQuery || "");
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      if (setSearchQuery) setSearchQuery("");
      return;
    }

    // Filter products for autocomplete
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(
      filtered.length > 0
        ? filtered.slice(0, 5) // Show max 5 suggestions
        : [{ id: "no-result", name: `No products found for "${value}"` }]
    );
  };

  const handleSearch = () => {
    setSuggestions([]);
    if (setSearchQuery) setSearchQuery(query);
    if (onSearchSubmit) onSearchSubmit();
    
    // Navigate to products page with search
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] flex items-center gap-4
      bg-[#1A73E8] px-6 py-4 transition-transform duration-300
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="h-14 w-14" />
        <span className="text-white font-bold text-2xl">Kindim</span>
      </div>

      {!hideSearch && (
        <div className="ml-10 hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full px-4 py-2 pr-20 rounded-md outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg z-10 max-h-80 overflow-y-auto">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className={`p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 ${
                    s.id === "no-result" ? "text-gray-500 text-center italic" : ""
                  }`}
                  onClick={() => {
                    if (s.id === "no-result") return;
                    navigate(`/product/${s.id}`);
                    setSuggestions([]);
                    setQuery("");
                  }}
                >
                  {s.id === "no-result" ? (
                    <span>{s.name}</span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0">
                        {s.image && (
                          <img
                            src={`http://localhost:5000/uploads/${s.image}`}
                            alt={s.name}
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{s.name}</p>
                        <p className="text-sm text-gray-600">Rs. {s.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={handleWishlistClick}
          className="relative p-2 rounded-full hover:bg-blue-400 transition group"
          title="View Wishlist"
        >
          <svg
            className="w-7 h-7 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <button
          onClick={handleCartClick}
          className="relative p-2 rounded-full hover:bg-blue-400 transition group"
          title="View Cart"
        >
          <svg
            className="w-7 h-7 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            className="text-white font-bold hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}