import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import Products from "../data/Product"; // make sure path is correct

export function Header({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Sync local input with the parent searchQuery
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      setSuggestions([]);
      setSearchQuery(""); 
      onSearchSubmit(); // reset search on clear
    } else {
      const filtered = Products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered); 
    }
  };

  const handleSelect = (item) => {
    if (item.id === "no-result") {
      // If user clicks "No products found", just do nothing
      setQuery("");
      setSuggestions([]);
      setSearchQuery(""); 
      onSearchSubmit();
      return;
    }

    setQuery(item.name);          
    setSuggestions([]);           
    setSearchQuery(item.name);  
    onSearchSubmit();   
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center gap-4 bg-[#1A73E8] px-4 py-3 sm:px-8 sm:py-4 md:px-10 transition-transform duration-300">
      <img src={logo} alt="logo" className="h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20" />
      <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">Kindim</span>

      {/* Search Bar */}
      <div className="ml-10 hidden md:flex flex-1 max-w-xl relative">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-12 rounded-md bg-white text-black outline-none"
          onKeyDown={(e) => {
  if (e.key === "Enter") {
    setSuggestions([]);    // hide dropdown
    setSearchQuery(query); // send current input to CategorySection
    onSearchSubmit();      // tell CategorySection to update
  }
}}

          
        />

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${item.id === "no-result" ? "justify-center text-gray-500" : ""}`}
                onClick={() => handleSelect(item)}
              >
                {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="ml-auto bg-[#3d87ff] text-black font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-100 active:scale-95 transition">
        Logout
      </button>
    </header>
  );
}
