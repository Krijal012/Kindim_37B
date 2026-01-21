import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

const LoginPage = React.lazy(() => import("../pages/public/LoginPage"));
const SignupPage = React.lazy(() => import("../pages/public/SignupPage"));
const ForgotPassword = React.lazy(() => import("../pages/public/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/public/ResetPassword"));
const ErrorPage = React.lazy(() => import("../pages/public/ErrorPage"));

const PublicRoutes = ({ onLogin }) => {
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
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
