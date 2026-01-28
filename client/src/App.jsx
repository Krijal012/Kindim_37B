
import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import DashBoard from "./pages/private/dashboard";
import Wishlist from "./pages/private/wishlist";
import WelcomeScreen from "./pages/public/welcomePage";







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
      <PublicRoutes />
    </>
  );
 }

export default App;
