import { ErrorPage } from "../pages/public/ErrorPage";
import { Route } from "react-router-dom";

export const PublicRoutes = (
    <>
        <Route key="error" path="*" element={<ErrorPage />} />
    </>
);