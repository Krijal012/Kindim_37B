import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/image/logo-icon.png";

// Lazy load components
const Dashboard = React.lazy(() => import("../pages/private/dashboard"));
const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
const ProfilePage = React.lazy(() => import("../pages/private/ProfilePage"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));

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
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard onLogout={onLogout} />} />

        {/* Other private pages */}
        <Route path="/rewarddashboard" element={<RewardDashboard onLogout={onLogout} />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/category/:category" element={<CategorySection onLogout={onLogout} />} />

        {/* Root path redirects to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Any unknown route redirects to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
