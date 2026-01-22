
import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import DashBoard from "./pages/private/dashboard";
import Wishlist from "./pages/private/wishlist";







function App() {
  
//    const [token, setToken] = useState(localStorage.getItem("access_token"));

//   return (
//   <>
//    {token ? (
//     <PrivateRoutes /> 
//    ):(

//     <PublicRoutes onLogin={() => setToken(localStorage.getItem("access_token"))} />
// )}
// </>
//   );
  return (
    <>
      <Wishlist />
    </>
  );
}

export default App;
