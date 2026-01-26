import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // ✅ For clickable links
import { useApi } from "../../hooks/useAPI";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Store,
  Search,
  Globe,
  User,
  Home,
  Settings,
} from "lucide-react";

const AdminDashboard = () => {
  const { callApi } = useApi();

  // Stats state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    totalSellers: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await callApi("GET", "/admin/stats"); // backend route
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [callApi]);

  // Prepare stats for UI
  const statsUI = [
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={20} /> },
    { label: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart size={20} /> },
    { label: "Revenue", value: `$ ${stats.revenue}`, icon: "💰" },
    { label: "Total Sellers", value: stats.totalSellers, icon: <Store size={20} /> },
  ];

  return (
    <div className="flex flex-col h-screen font-sans">
      {/* --- TOP NAVBAR --- */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#1D71E2] text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-md text-[#1D71E2]">
            <ShoppingCart size={24} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold italic">Kindim</h1>
        </div>

        <div className="flex-1 max-w-xl mx-10 relative">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full py-1 px-4 pr-10 rounded text-black outline-none"
          />
          <Search className="absolute right-3 top-1.5 text-gray-500" size={18} />
        </div>

        <div className="flex items-center gap-6">
          <Globe size={20} className="cursor-pointer" />
          <User size={20} className="cursor-pointer" />
          <Home size={20} className="cursor-pointer" />
          <Settings size={20} className="cursor-pointer" />
          <button className="bg-[#123e7a] px-4 py-1 rounded text-sm font-medium">Logout</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 py-6">
          <h2 className="px-6 text-gray-700 font-bold mb-4">Admin</h2>
          <nav className="flex flex-col">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/admin/dashboard" />
            <NavItem icon={<Users size={18} />} label="User Management" to="/admin/users" />
            <NavItem icon={<ShoppingCart size={18} />} label="Order Management" to="/admin/orders" />
            <NavItem icon={<Store size={18} />} label="Seller Management" to="/admin/sellers" />
          </nav>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-10 bg-white overflow-y-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Admin Dashboard</h2>

          {/* Stat Cards */}
          <div className="bg-gray-100 rounded-[40px] p-8 border border-gray-300 flex justify-around items-center">
            {loading ? (
              <p className="text-gray-500">Loading stats...</p>
            ) : (
              statsUI.map((stat, idx) => (
                <div key={idx} className="bg-white border border-gray-400 rounded-[30px] w-48 h-48 flex flex-col items-center justify-center text-center shadow-sm">
                  <p className="text-lg font-semibold text-gray-800">
                    {stat.label}: {stat.value}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Placeholder for System Overview */}
          <div className="mt-10 p-6 border rounded-lg">
            <h3 className="font-bold mb-4">System Overview</h3>
            <div className="text-gray-400 italic text-center py-10 border-dashed border-2">
              Charts and reports coming soon...
            </div>
          </div>
        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1D71E2] text-white p-10 flex justify-between items-start">
        <div className="max-w-xs">
          <h4 className="font-bold mb-2">Kindim</h4>
          <p className="text-sm opacity-80">Your trusted online marketplace for quality products at great prices.</p>
        </div>
        <div className="text-right">
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1 opacity-80">
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

// Sidebar NavItem with clickable link
const NavItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
        isActive ? "bg-[#1D71E2] text-white" : "text-gray-600 hover:bg-gray-200"
      }`
    }
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default AdminDashboard;
