import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/image/logo-icon.png";

const SignupPage = React.lazy(() => import("../pages/public/SignupPage"));

const PublicRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <img src={loader} alt="Loading..." className="w-20 h-20" />
        </div>
      }
    >
      <Routes>
      
        <Route path="/signup" element={<SignupPage />} />
      
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
