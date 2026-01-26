import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";
import ProfilePage from "../pages/private/ProfilePage";

const Dashboard = React.lazy(() => import("../pages/private/dashboard"));
const SellerDashboard = React.lazy(() => import("../pages/private/Sellerdashboard"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));
const ProductDetail = React.lazy(() => import("../pages/private/ProductDetail"));
const CartPage = React.lazy(() => import("../pages/private/CartPage"));
const WishlistPage = React.lazy(() => import("../pages/private/Wishlist"));
const OrderHistoryPage = React.lazy(() => import("../pages/private/OrderHistoryPage"));
const Checkout = React.lazy(() => import("../pages/private/Checkout"));
const ProductComparison = React.lazy(() => import("../pages/private/ProductComparison"));

const PrivateRoutes = ({ onLogout, userRole }) => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <img src={loader} className="w-20 animate-pulse" />
      </div>
    }>
      <Routes>
        <Route path="/" element={
          userRole === "seller" 
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/compare" element={<ProductComparison />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;