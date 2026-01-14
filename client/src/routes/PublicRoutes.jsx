import { ErrorPage } from "../Pages/public/ErrorPage";
import {Route} from "react-router-dom";

export function PublicRoutes (){
    <>
    <Route key="error" path="*" element={<ErrorPage />} />
    </>;
}