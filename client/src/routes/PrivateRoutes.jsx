import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

// Lazy load components
const Dashboard = React.lazy(() => import("../pages/private/dashboard"));
const SellerDashboard = React.lazy(() => import("../pages/private/SellerDashboard"));
// const AdminDashboard = React.lazy(() => import("../pages/private/AdminDashboard"));
const ProfilePage = React.lazy(() => import("../pages/private/ProfilePage"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to their appropriate dashboard
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (userRole === "seller") return <Navigate to="/seller-dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const PrivateRoutes = ({ onLogout, userRole }) => {
  // Determine default dashboard based on role
  const getDefaultDashboard = () => {
    if (userRole === "admin") return "/admin-dashboard";
    if (userRole === "seller") return "/seller-dashboard";
    return "/dashboard";
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <img
            src={loader}
            alt="Loading..."
            className="w-20 h-20 animate-pulse"
          />
        </div>
      }
    >
      <Routes>
        {/* Default redirect based on role */}
        <Route path="/" element={<Navigate to={getDefaultDashboard()} replace />} />

        {/* Customer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]} userRole={userRole}>
              <Dashboard onLogout={onLogout} />
            </ProtectedRoute>
          }
        />

        {/* Seller Dashboard */}
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]} userRole={userRole}>
              <SellerDashboard onLogout={onLogout} />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
              <AdminDashboard onLogout={onLogout} />
            </ProtectedRoute>
          }
        />

        {/* Shared pages - accessible by all roles */}
        <Route
          path="/rewarddashboard"
          element={<RewardDashboard onLogout={onLogout} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage onLogout={onLogout} />}
        />
        <Route
          path="/category/:category"
          element={<CategorySection onLogout={onLogout} />}
        />

        {/* Catch-all - redirect to appropriate dashboard */}
        <Route path="*" element={<Navigate to={getDefaultDashboard()} replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;