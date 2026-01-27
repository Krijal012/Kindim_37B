// AdminLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, Store, Globe, Bell, Settings } from "lucide-react";

const AdminLayout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-slate-900 shadow-xl border-r border-slate-800 fixed h-screen flex flex-col">
                <div className="p-6 flex-1">
                    <div className="text-2xl font-bold text-white mb-10 flex items-center">
                        <span className="mr-2">🛒</span> Kindim
                    </div>

                    <div className="mb-6">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-3">Admin Controls</p>
                        <nav className="space-y-2">
                            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/admin-dashboard" />
                            <NavItem icon={<Users size={18} />} label="User Management" to="/admin/users" />
                            <NavItem icon={<ShoppingCart size={18} />} label="Order Management" to="/admin/orders" />
                            <NavItem icon={<Store size={18} />} label="Seller Management" to="/admin/sellers" />
                        </nav>
                    </div>
                </div>

                {/* Logout button in sidebar */}
                <div className="p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-700 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                {/* Main Content */}
                <main className="flex-1 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all font-medium ${isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`
        }
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export default AdminLayout;