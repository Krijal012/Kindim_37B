import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ErrorPage } from "./pages/public/ErrorPage";

function App() {
  //  const [token, setToken] = useState(localStorage.getItem("access_token"));
  return (
  <>
  <ErrorPage />
   {/* {token ? (
    <PrivateRoutes /> 
   ):(
    <PublicRoutes onLogin={() => setToken(localStorage.getItem("access_token"))} />
)} */}
</>
  );

}

export default App;
