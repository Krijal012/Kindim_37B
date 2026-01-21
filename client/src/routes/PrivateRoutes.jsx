import CartPage from "../pages/private/CartPage";
import CategorySection from "../pages/private/CategorySection";
import {Route} from "react-router-dom";

export const PrivateRoutes = (
    <>
        <Route key="products" path="/" element={<CategorySection />} />
        <Route key="cartpage" path="/cartpage" element={<CartPage />} />
    </>
);