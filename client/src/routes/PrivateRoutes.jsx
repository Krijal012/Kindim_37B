import CartPage from "../pages/private/CartPage";
import CategorySection from "../pages/private/CategorySection";
import OrderHistoryPage from "../pages/private/OrderHistoryPage";
import { Route } from "react-router-dom";

export const PrivateRoutes = (
    <>
        <Route key="products" path="/" element={<CategorySection />} />
        <Route key="cartpage" path="/cartpage" element={<CartPage />} />
        <Route key="orderhistory" path="/orderhistory" element={<OrderHistoryPage />} />
    </>
);