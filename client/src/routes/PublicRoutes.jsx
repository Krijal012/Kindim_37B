import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/loading/loading.gif";

// ✅ Correct lazy import (COMPONENT, not GIF)
const LoginPage = React.lazy(() => import("../pages/public/LoginPage"));

const PublicRoutes = ({ onLogin }) => {
  // 🔹 LOADING STATE (3 seconds)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 🔹 FULLSCREEN LOADING (CLEAR, NO BLUR)
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <img
          src={loader}
          alt="Loading..."
          className="w-24 opacity-100"
          style={{ filter: "none" }}
        />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <img src={loader} alt="Loading..." className="w-20" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
