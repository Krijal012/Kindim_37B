import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

const SellerDashboard = React.lazy(() => import("../pages/private/Sellerdashboard")); 
const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));
const ProfilePage = React.lazy(() => import("../pages/private/ProfilePage"));

// 1. ADD THIS LAZY LOAD FOR PRODUCT DETAILS
const ProductDetail = React.lazy(() => import("../pages/private/ProductDetail")); 

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
        <Route path="/" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/products" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/rewarddashboard" element={<RewardDashboard onLogout={onLogout} />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/seller-dashboard" element={<SellerDashboard onLogout={onLogout} />} />

        {/* 2. ADD THIS DYNAMIC ROUTE HERE */}
        {/* The ':id' allows any product ID to use this page */}
        <Route path="/product/:id" element={<ProductDetail onLogout={onLogout} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;