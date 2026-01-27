import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";
import ProfilePage from "../pages/private/ProfilePage";
import AdminLayout from "../components/AdminLayout";

// Lazy imports
const Dashboard = React.lazy(() => import("../pages/private/dashboard"));
const SellerDashboard = React.lazy(() => import("../pages/private/Sellerdashboard"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));
const ProductDetail = React.lazy(() => import("../pages/private/ProductDetail"));
const CartPage = React.lazy(() => import("../pages/private/CartPage"));
const WishlistPage = React.lazy(() => import("../pages/private/Wishlist"));
const OrderHistoryPage = React.lazy(() => import("../pages/private/OrderHistoryPage"));
const Checkout = React.lazy(() => import("../pages/private/Checkout"));
const ProductComparison = React.lazy(() => import("../pages/private/ProductComparison"));
const BargainPage = React.lazy(() => import("../pages/private/BargainPage"));
const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
const OrderManagement = React.lazy(() => import("../pages/private/OrderManagement"));
const UserManagement = React.lazy(() => import("../pages/private/UserManagement"));
const AdminDashboard = React.lazy(() => import("../pages/private/AdminDashboard"));
const SellerManagement = React.lazy(() => import("../pages/private/SellerManagement"));


const PrivateRoutes = ({ onLogout, userRole }) => {
  // If userRole is not passed, try fallback from localStorage
  const role = userRole || localStorage.getItem("userRole") || "customer";

  console.log("PrivateRoutes: Current User Role:", role); // DEBUG LOG

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <img src={loader} className="w-20 animate-pulse" />
      </div>
    }>
      <Routes>
        {/* Admin Routes - Nested under AdminLayout */}
        {role === "admin" ? (
          <Route path="/*" element={<AdminLayout onLogout={onLogout} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="admin/users" element={<UserManagement onLogout={onLogout} />} />
            <Route path="admin/sellers" element={<SellerManagement onLogout={onLogout} />} />
            <Route path="admin/orders" element={<OrderManagement onLogout={onLogout} />} />
            <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
          </Route>
        ) : (
          <>
            {/* Customer & Seller Routes */}
            <Route path="/" element={
              role === "seller"
                ? <SellerDashboard onLogout={onLogout} />
                : <Dashboard onLogout={onLogout} />
            } />
            <Route path="/products" element={<CategorySection />} />
            <Route path="/category/:category" element={<CategorySection />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
            <Route path="/compare" element={<ProductComparison />} />
            <Route path="/bargain/:id" element={<BargainPage />} />
            <Route path="/rewarddashboard" element={<RewardDashboard onLogout={onLogout} />} />

            {/* Seller Routes */}
            <Route path="/seller-dashboard" element={
              role === "seller"
                ? <SellerDashboard onLogout={onLogout} />
                : <Navigate to="/" replace />
            } />
            <Route path="/seller-orders" element={
              role === "seller"
                ? <OrderManagement onLogout={onLogout} />
                : <Navigate to="/" replace />
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;