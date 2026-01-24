import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/image/logo-icon.png";


const Profile = React.lazy(()=> import("../pages/private/Profile"))
const Checkout = React.lazy(()=> import("../pages/private/Checkout"))
const ProductComparison = React.lazy(()=> import("../pages/private/ProductComparison"))

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
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<Profile />} />
</Routes>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/productcomparison" element={<ProductComparison/>}/>

    </Suspense>
  );
};

export default PrivateRoutes;
