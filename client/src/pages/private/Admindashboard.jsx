import { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { DashboardSidebar } from "../../components/dashboardsidebar";
import { StatCard } from "../../components/statcard";

export function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="flex pt-20">
        <DashboardSidebar
          userType="admin"
          activeMenu={activeMenu}
          onMenuClick={setActiveMenu}
        />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Admin Dashboard
          </h1>

          {activeMenu === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Users" value="100" />
              <StatCard title="Total Orders" value="100" />
              <StatCard title="Revenue" value="$5000" />
              <StatCard title="Total Sellers" value="100" />
            </div>
          )}

          {activeMenu === "user" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">User Management</h2>
            </div>
          )}

          {activeMenu === "order" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Order Management</h2>
            </div>
          )}

          {activeMenu === "seller" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Seller Management</h2>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
