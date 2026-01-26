import CartPage from "../pages/private/CartPage";
import CategorySection from "../pages/private/CategorySection";
import OrderHistoryPage from "../pages/private/OrderHistoryPage";
import ProductDetail from "../pages/private/ProductDetail";
import BargainPage from "../pages/private/BargainPage";
import OrderConfirmedPage from "../pages/private/OrderConfirmedPage";
import { Route } from "react-router-dom";

export const PrivateRoutes = (
    <>
        <Route key="products" path="/" element={<CategorySection />} />
        <Route key="cartpage" path="/cartpage" element={<CartPage />} />
        <Route key="cart" path="/cart" element={<CartPage />} />
        <Route key="orderhistory" path="/orderhistory" element={<OrderHistoryPage />} />
        <Route key="productdetail" path="/product/:id" element={<ProductDetail />} />
        <Route key="bargain" path="/bargain" element={<BargainPage />} />
        <Route key="orderconfirmed" path="/order-confirmed" element={<OrderConfirmedPage />} />
    </>
);