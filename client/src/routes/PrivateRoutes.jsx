import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

// Lazy load components
const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));
const ProfilePage = React.lazy(() => import("../pages/private/ProfilePage"));

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
        {/* Main Routes */}
        <Route path="/" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/products" element={<CategorySection onLogout={onLogout} />} />
        <Route path="/rewarddashboard" element={<RewardDashboard onLogout={onLogout} />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
