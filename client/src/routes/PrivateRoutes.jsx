import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/image/logo-icon.png";


const Profile = React.lazy(()=> import("../pages/private/Profile"))

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
        
        <Route path="/profile" element={<Profile/>}/>
        
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
