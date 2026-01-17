
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loader from "../assets/image/logo-icon.png";

const RewardDashboard = React.lazy(() => import("../pages/private/RewardDashboard"));
// const Candle = React.lazy(() => import("../pages/private/Candles"));
// const Decorative = React.lazy(() => import("../pages/private/Decorative"));
const CategorySection = React.lazy(() => import("../pages/private/CategorySection"));

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
        {/* <Route path="/candles" element={<Candle />} />
        <Route path="*" element={<Navigate to="/candles" />} /> */}

 
        {/* <Route path="/decorative" element={<Decorative />} />
        <Route path="*" element={<Navigate to="/decorative" />} /> */}

        <Route path ="/category" element={<CategorySection/>}/>
        <Route path ="*" element={<Navigate to="/category" />} />
         <Route key="products" path="/" element={<CategorySection />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;

// import CategorySection from "../pages/private/CategorySection";
// import {Route} from "react-router-dom";

// export function PrivateRoutes (){
//     <>
//     <Route key="products" path="/" element={<CategorySection />} />
//     </>;
// }
