import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PersonalInfo from "../../components/PersonalInfo";

export default function ProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { callApi } = useApi();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("GET", "/api/profile");
        setUser(res.data || res);
      } catch (err) {
        console.error("Profile fetch error:", err);
        // Set a default user object if API fails
        setUser({
          name: "User",
          email: localStorage.getItem("userEmail") || "user@example.com",
          profileImage: null
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle URL tab parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;
      setShowHeader(currentScroll < lastScrollY);
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowFooter(atBottom);
      setLastScrollY(currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <PersonalInfo user={user} setUser={setUser} />;
      
      case "orders":
        return (
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <div className="text-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No orders yet</p>
              <button
                onClick={() => navigate("/products")}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Start Shopping
              </button>
            </div>
          </div>
        );
      
      case "returns":
        return (
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Returns & Cancellations</h2>
            <div className="text-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              <p className="text-gray-500 text-lg">No returns or cancellations</p>
              <p className="text-gray-400 text-sm mt-2">Your return requests will appear here</p>
            </div>
          </div>
        );
      
      case "reviews":
        return (
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">My Ratings & Reviews</h2>
            <div className="text-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No reviews yet</p>
              <p className="text-gray-400 text-sm mt-2">Share your experience with products you've purchased</p>
            </div>
          </div>
        );
      
      case "payment":
        return (
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
            <div className="text-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No payment methods saved</p>
              <p className="text-gray-400 text-sm mt-2">Add a card for faster checkout</p>
            </div>
          </div>
        );
      
      case "change-password":
        return (
          <div className="flex-1 bg-white p-6 rounded-lg shadow max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              alert("Password change functionality will be implemented soon!");
            }}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Change Password
              </button>
            </form>
          </div>
        );
      
      default:
        return <PersonalInfo user={user} setUser={setUser} />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header show={showHeader} onLogout={handleLogout} />

      <main className="mt-[112px] px-6 py-8 pb-32 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Sidebar with menu items */}
            <div className="w-64 bg-white shadow p-4 rounded-lg">
              <div className="flex items-center gap-3 border-b pb-4 mb-4">
                {user?.profileImage ? (
                  <img
                    src={`http://localhost:5000${user.profileImage}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{user?.name || "User"}</h3>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                </div>
              </div>

              <ul className="space-y-1 text-sm">
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeTab === "profile"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    My Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeTab === "orders"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    My Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("returns")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeTab === "returns"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    Returns & Cancel
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeTab === "reviews"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    My Rating & Review
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="w-full text-left px-3 py-2 rounded cursor-pointer hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    My Wishlist
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeTab === "payment"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    Payment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("change-password")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeTab === "change-password"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Content - Dynamic based on activeTab */}
            {renderContent()}
          </div>
        </div>
      </main>

      <Footer show={showFooter} />
    </div>
  );
}