import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo-icon.png";
import profileIcon from "../assets/icons/profile.png";
import Products from "../data/Product";

export default function Header({
  show = true,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onLogout
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
      setSearchQuery("");
      onSearchSubmit();
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
      <img src={logo} alt="logo" className="h-14 w-14" />
      <span className="text-white font-bold text-2xl">Kindim</span>

      {/* Search */}
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
              setSearchQuery(query);
              onSearchSubmit();
            }
          }}
        />
      </div>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-4">
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
          className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
