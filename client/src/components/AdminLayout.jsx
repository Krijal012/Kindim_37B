// AdminLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, Store, Menu, X } from "lucide-react";
import { useState } from "react";

const AdminLayout = ({ onLogout }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`
                w-64 bg-slate-900 shadow-xl border-r border-slate-800 
                fixed h-screen flex flex-col z-40 
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                <div className="p-4 sm:p-6 flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-10 flex items-center">
                        <span className="mr-2">🛒</span> Kindim
                    </div>

                    <div className="mb-6">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-3">Admin Controls</p>
                        <nav className="space-y-2">
                            <NavItem
                                icon={<LayoutDashboard size={18} />}
                                label="Dashboard"
                                to="/admin-dashboard"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <NavItem
                                icon={<Users size={18} />}
                                label="User Management"
                                to="/admin/users"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <NavItem
                                icon={<ShoppingCart size={18} />}
                                label="Order Management"
                                to="/admin/orders"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <NavItem
                                icon={<Store size={18} />}
                                label="Seller Management"
                                to="/admin/sellers"
                                onClick={() => setSidebarOpen(false)}
                            />
                        </nav>
                    </div>
                </div>

                {/* Logout button in sidebar */}
                <div className="p-4 sm:p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-600 text-white px-4 py-2 sm:py-3 rounded-xl font-bold shadow-lg hover:bg-gray-700 transition-all text-sm sm:text-base"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Main Content */}
                <main className="flex-1 bg-gray-50 p-4 sm:p-6 pt-16 md:pt-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, to, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-3 p-2 sm:p-3 rounded-lg transition-all font-medium text-sm sm:text-base ${isActive
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