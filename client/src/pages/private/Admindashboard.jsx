// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAPI";
import { Users, ShoppingCart, Store } from "lucide-react";

const AdminDashboard = () => {
  const { callApi } = useApi();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    totalSellers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await callApi("GET", "/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [callApi]);

  const statsUI = [
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={20} /> },
    { label: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart size={20} /> },
    { label: "Revenue", value: `$ ${stats.revenue}`, icon: "💰" },
    { label: "Total Sellers", value: stats.totalSellers, icon: <Store size={20} /> },
  ];

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">Admin Dashboard</h1>

      <div className="bg-white rounded-2xl sm:rounded-[40px] p-6 sm:p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center mb-10">
        {loading ? (
          <p className="text-gray-500 text-center col-span-full">Loading stats...</p>
        ) : (
          statsUI.map((stat, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl sm:rounded-[30px] p-6 h-auto sm:h-48 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-2 text-blue-600">
                {typeof stat.icon === 'string' ? <span className="text-2xl sm:text-3xl">{stat.icon}</span> : stat.icon}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-black text-gray-800">{stat.value}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6 text-xl">System Overview</h3>
        <div className="text-gray-400 italic text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          Charts and reports coming soon...
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;