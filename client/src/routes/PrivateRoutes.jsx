import CategorySection from "../pages/private/CategorySection";
import {Route} from "react-router-dom";

export function PrivateRoutes (){
    <>
    <Route key="products" path="/" element={<CategorySection />} />
    </>;
}