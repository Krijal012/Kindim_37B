import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

const Dashboard = React.lazy(() => import("../pages/private/dashboard"));
const SellerDashboard = React.lazy(() => import("../pages/private/Sellerdashboard"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));
const ProfilePage = React.lazy(() => import("../pages/private/ProfilePage"));
const ProductDetail = React.lazy(() => import("../pages/private/ProductDetail"));
const CartPage = React.lazy(() => import("../pages/private/CartPage"));
const WishlistPage = React.lazy(() => import("../pages/private/Wishlist")); // ← ADD THIS
const OrderHistoryPage = React.lazy(() => import("../pages/private/OrderHistoryPage"));

const PrivateRoutes = ({ onLogout }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <img src={loader} alt="Loading..." className="w-20 h-20 animate-pulse" />
        </div>
      }
    >
      <Routes>
        {/* Default route - Dashboard */}
        <Route path="/" element={<Dashboard onLogout={onLogout} />} />
        <Route path="/dashboard" element={<Dashboard onLogout={onLogout} />} />

        {/* Category and Products */}
        <Route path="/products" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/category/:category" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/product/:id" element={<ProductDetail onLogout={onLogout} />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage onLogout={onLogout} />} />
        <Route path="/cartpage" element={<CartPage onLogout={onLogout} />} />

        {/* Wishlist - ADD THIS */}
        <Route path="/wishlist" element={<WishlistPage onLogout={onLogout} />} />

        {/* Other Pages */}
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/orderhistory" element={<OrderHistoryPage onLogout={onLogout} />} />

        {/* Seller Dashboard */}
        <Route path="/seller-dashboard" element={<SellerDashboard onLogout={onLogout} />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;