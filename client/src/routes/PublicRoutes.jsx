import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/icons/logo-icon.png";

const LoginPage = React.lazy(() => import("../pages/public/LoginPage"));


const PublicRoutes = ({ onLogin }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <img src={loader} alt="Loading..." className="w-20 h-20" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
     
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
