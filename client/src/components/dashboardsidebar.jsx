import React from "react";

export function DashboardSidebar({
  userType,
  activeMenu,
  onMenuClick = () => {}
}) {
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "user", label: "User Management" },
    { id: "order", label: "Order Management" },
    { id: "seller", label: "Seller Management" }
  ];

  const sellerMenuItems = [
    { id: "overview", label: "Overview" },
    { id: "products", label: "My Products" },
    { id: "orders", label: "My Orders" }
  ];

  const menuItems = userType === "admin" ? adminMenuItems : sellerMenuItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500">
          {userType === "admin" ? "Admin Panel" : "Seller Panel"}
        </h3>
        {userType === "seller" && (
          <p className="text-xs text-gray-400">Seller User</p>
        )}
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuClick(item.id)}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeMenu === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
