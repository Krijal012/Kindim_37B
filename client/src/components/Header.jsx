import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo-icon.png";
import profileIcon from "../assets/icons/profile.png";

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

  useEffect(() => {
    setQuery(searchQuery || "");
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      if (setSearchQuery) setSearchQuery("");
      if (onSearchSubmit) onSearchSubmit();
      return;
    }

    const filtered = Products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.length ? filtered : [{ id: "no-result", name: "No products found" }]);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] flex items-center gap-4
      bg-[#1A73E8] px-6 py-4 transition-transform duration-300
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="h-14 w-14" />
        <span className="text-white font-bold text-2xl">Kindim</span>
      </div>

      {/* Search - Hide if hideSearch is true */}
      {!hideSearch && (
        <div className="ml-10 hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSuggestions([]);
                if (setSearchQuery) setSearchQuery(query);
                if (onSearchSubmit) onSearchSubmit();
              }
            }}
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg z-10">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    if (s.id === "no-result") return;
                    navigate(`/product/${s.id}`);
                    setSuggestions([]);
                  }}
                >
                  {s.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-4">
        {/* Wishlist Icon */}
        <button
          onClick={() => navigate("/wishlist")}
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
          {/* Optional: Badge for wishlist item count */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            5
          </span> */}
        </button>

        {/* Cart Icon */}
        <button
          onClick={() => navigate("/cart")}
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
          {/* Optional: Badge for cart item count */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span> */}
        </button>

        {/* Profile Icon */}
        <button
          onClick={() => navigate("/profile")}
          className="p-2 rounded-full hover:bg-blue-400 transition"
          title="Profile Settings"
        >
          <img src={profileIcon} alt="Profile" className="w-8 h-8 rounded-full" />
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}