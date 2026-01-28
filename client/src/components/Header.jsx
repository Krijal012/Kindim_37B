import { useState, useEffect, useRef } from "react";
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [user, setUser] = useState(null);
  const profileMenuRef = useRef(null);

  // Fetch user profile
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    fetchUserProfile();
  }, []);

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

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        ? filtered.slice(0, 5)
        : [{ id: "no-result", name: `No products found for "${value}"` }]
    );
  };

  const handleSearch = () => {
    setSuggestions([]);
    if (setSearchQuery) setSearchQuery(query);
    if (onSearchSubmit) onSearchSubmit();
    setShowMobileSearch(false);

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
    setShowMobileMenu(false);
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
    setShowMobileMenu(false);
  };

  const profileMenuItems = [
    { label: "My Account", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", path: "/profile" },
    { label: "My Orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", path: "/profile?tab=orders" },
    { label: "Returns & Cancel", icon: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6", path: "/profile?tab=returns" },
    { label: "My Reviews", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", path: "/profile?tab=reviews" },
    { label: "My Wishlist", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", path: "/wishlist" },
    { label: "Payment Methods", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", path: "/profile?tab=payment" },
    { label: "Change Password", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z", path: "/profile?tab=change-password" },
  ];

  const handleProfileMenuClick = (path) => {
    setShowProfileMenu(false);
    setShowMobileMenu(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] bg-[#1A73E8] transition-transform duration-300
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Main Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-1 sm:gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">Kindim</span>
        </div>

        {/* Desktop Search Bar */}
        {!hideSearch && (
          <div className="ml-4 md:ml-10 hidden md:flex flex-1 max-w-xl relative">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 pr-20 rounded-md outline-none text-sm lg:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 lg:px-4 py-1 rounded hover:bg-blue-700 transition text-sm lg:text-base"
            >
              Search
            </button>

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg z-10 max-h-80 overflow-y-auto">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    className={`p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 ${s.id === "no-result" ? "text-gray-500 text-center italic" : ""
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

        {/* Desktop Icons */}
        <div className="hidden md:flex ml-auto items-center gap-2 lg:gap-4">
          {!hideSearch && (
            <button
              onClick={handleWishlistClick}
              className="relative p-2 rounded-full hover:bg-blue-400 transition group"
              title="View Wishlist"
            >
              <svg
                className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform"
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
          )}

          <button
            onClick={handleCartClick}
            className="relative p-2 rounded-full hover:bg-blue-400 transition group"
            title="View Cart"
          >
            <svg
              className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform"
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

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative p-2 rounded-full hover:bg-blue-400 transition group"
              title="My Profile"
            >
              {user?.profileImage ? (
                <img
                  src={`http://localhost:5000${user.profileImage}`}
                  alt="Profile"
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
                  <p className="text-sm text-gray-600 truncate">{user?.email || ""}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {profileMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleProfileMenuClick(item.path)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition-colors text-left"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left"
                  >
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-red-600 text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden ml-auto items-center gap-2">
          {!hideSearch && (
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-full hover:bg-blue-400 transition"
              title="Search"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {/* Hamburger Menu */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-full hover:bg-blue-400 transition"
            title="Menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {!hideSearch && showMobileSearch && (
        <div className="md:hidden px-3 pb-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 pr-20 rounded-md outline-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
            >
              Search
            </button>

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    className={`p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 ${s.id === "no-result" ? "text-gray-500 text-center italic text-sm" : ""
                      }`}
                    onClick={() => {
                      if (s.id === "no-result") return;
                      navigate(`/product/${s.id}`);
                      setSuggestions([]);
                      setQuery("");
                      setShowMobileSearch(false);
                    }}
                  >
                    {s.id === "no-result" ? (
                      <span className="text-sm">{s.name}</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0">
                          {s.image && (
                            <img
                              src={`http://localhost:5000/uploads/${s.image}`}
                              alt={s.name}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{s.name}</p>
                          <p className="text-xs text-gray-600">Rs. {s.price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto">
          {/* User Info */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {user?.profileImage ? (
                <img
                  src={`http://localhost:5000${user.profileImage}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{user?.name || "User"}</p>
                <p className="text-sm text-gray-600 truncate">{user?.email || ""}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="py-2 border-b border-gray-200">
            <button
              onClick={handleWishlistClick}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
              <span className="text-gray-700">My Wishlist</span>
            </button>

            <button
              onClick={handleCartClick}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
              <span className="text-gray-700">My Cart</span>
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2 border-b border-gray-200">
            {profileMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleProfileMenuClick(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                <span className="text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="py-2">
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
            >
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-red-600 font-semibold">Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}