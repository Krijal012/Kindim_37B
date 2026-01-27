import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PersonalInfo from "../../components/PersonalInfo";
import Orders from "../../components/Orders";
import Payment from "../../components/Payment";

export default function ProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { callApi } = useApi();
  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to view your profile.", { toastId: "profile-login-required" });
      navigate("/login");
      return;
    }

    setProfileLoading(true);
    setProfileError(null);

    try {
      const res = await callApi("GET", "/api/profile");
      const data = res?.data ?? res;
      setUser(data ?? null);
      if (!data) {
        setProfileError("Failed to load profile.");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setUser(null);
      setProfileError(err?.message || "Failed to load profile.");
    } finally {
      setProfileLoading(false);
    }
  }, [callApi, navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
        return <Orders />;
      
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
        return <Payment />;
      
      case "change-password":
        return (
          <div className="flex-1 bg-white p-6 rounded-lg shadow max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!currentPassword || !newPassword || !confirmNewPassword) {
                  toast.warn("Please fill all password fields.");
                  return;
                }

                if (newPassword.length < 6) {
                  toast.warn("New password must be at least 6 characters.");
                  return;
                }

                if (newPassword !== confirmNewPassword) {
                  toast.error("New passwords do not match.");
                  return;
                }

                try {
                  setChangingPassword(true);
                  await callApi("POST", "/auth/change-password", {
                    currentPassword,
                    newPassword,
                    confirmPassword: confirmNewPassword,
                  });

                  toast.success("Password changed successfully!");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                } catch (err) {
                  console.error("Change password error:", err);
                  toast.error(err?.message || "Failed to change password.");
                } finally {
                  setChangingPassword(false);
                }
              }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={changingPassword}
                className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {changingPassword ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        );
      
      default:
        return <PersonalInfo user={user} setUser={setUser} />;
    }
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header show={showHeader} onLogout={handleLogout} />
        <main className="mt-[112px] px-6 py-12">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow-sm text-center">
            <h2 className="text-xl font-bold text-gray-900">Couldn’t load your profile</h2>
            <p className="text-gray-600 mt-2">{profileError}</p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={fetchProfile}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Retry
              </button>
              <button
                onClick={() => navigate("/")}
                className="border border-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50"
              >
                Go Home
              </button>
            </div>
          </div>
        </main>
        <Footer show={showFooter} />
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
                  <h3 className="font-semibold text-sm">{user?.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>

              <ul className="space-y-1 text-sm">
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                      activeTab === "profile"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    My Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                      activeTab === "orders"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    My Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("returns")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                      activeTab === "returns"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Returns & Cancel
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                      activeTab === "reviews"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    My Rating & Review
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="w-full text-left px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                  >
                    My Wishlist
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                      activeTab === "payment"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Payment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("change-password")}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                      activeTab === "change-password"
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
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