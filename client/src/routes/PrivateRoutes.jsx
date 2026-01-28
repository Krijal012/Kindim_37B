import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/loading/loading.gif";
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
  const role = userRole || localStorage.getItem("userRole") || "customer";

  // 🔹 LOADING STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 🔹 FIXED, CLEAR, NO BLUR LOADING SCREEN
  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex justify-center items-center bg-white"
        style={{ filter: "none", backdropFilter: "none" }}
      >
        <img
          src={loader}
          alt="Loading"
          className="w-28 opacity-100"
          style={{ filter: "none" }}
        />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
          <img src={loader} className="w-24" />
        </div>
      }
    >
      <Routes>
        {/* Admin Routes */}
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
            <Route
              path="/"
              element={
                role === "seller"
                  ? <SellerDashboard onLogout={onLogout} />
                  : <Dashboard onLogout={onLogout} />
              }
            />
 
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

            <Route
              path="/seller-dashboard"
              element={
                role === "seller"
                  ? <SellerDashboard onLogout={onLogout} />
                  : <Navigate to="/" replace />
              }
            />

            <Route
              path="/seller-orders"
              element={
                role === "seller"
                  ? <OrderManagement onLogout={onLogout} />
                  : <Navigate to="/" replace />
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
