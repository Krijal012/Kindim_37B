import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

// Lazy imports
const SellerDashboard = React.lazy(() => import("../pages/private/Sellerdashboard")); 
const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));
const ProfilePage = React.lazy(() => import("../pages/private/ProfilePage"));
const OrderManagement = React.lazy(() => import("../pages/private/OrderManagement"));
const ProductDetail = React.lazy(() => import("../pages/private/ProductDetail")); 
const UserManagement = React.lazy(() => import("../pages/private/UserManagement"));
const AdminDashboard = React.lazy(() => import("../pages/private/AdminDashboard")); 
const SellerManagement = React.lazy(() => import("../pages/private/SellerManagement"));

const PrivateRoutes = ({ onLogout }) => {
  const userRole = localStorage.getItem("userRole"); // "admin", "seller", "user", etc.

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <img src={loader} alt="Loading..." className="w-20 h-20 animate-pulse" />
        </div>
      }
    >
      <Routes>
        {/* Common routes */}
        <Route path="/" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/products" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/rewarddashboard" element={<RewardDashboard onLogout={onLogout} />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/product/:id" element={<ProductDetail onLogout={onLogout} />} />

        {/* Seller routes */}
        <Route path="/seller-dashboard" element={
          userRole === "seller" 
            ? <SellerDashboard onLogout={onLogout} /> 
            : <Navigate to="/" replace />
        } />
        <Route path="/seller-orders" element={
          userRole === "seller" 
            ? <OrderManagement onLogout={onLogout} /> 
            : <Navigate to="/" replace />
        } />

        {/* Admin routes */}
        <Route path="/admin-dashboard" element={
          userRole === "admin" 
            ? <AdminDashboard onLogout={onLogout} /> 
            : <Navigate to="/" replace />
        } />
        <Route path="/admin/users" element={
          userRole === "admin" 
            ? <UserManagement onLogout={onLogout} /> 
            : <Navigate to="/" replace />
        } />

        <Route path="/admin/sellers" element={
          userRole === "admin" 
            ? <SellerManagement onLogout={onLogout} /> 
            : <Navigate to="/" replace />
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
