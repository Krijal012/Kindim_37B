import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/image/logo-icon.png";

const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
const Candle = React.lazy(() => import("../pages/private/Candles"));

const PrivateRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <img src={loader} alt="Loading..." className="w-20 h-20" />
        </div>
      }
    >
      <Routes>
        <Route path="/candles" element={<Candle />} />
        <Route path="*" element={<Navigate to="/candles" />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
