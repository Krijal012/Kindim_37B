import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import DashBoard from "./pages/private/dashboard";

function App() {
   const [token, setToken] = useState(localStorage.getItem("access_token"));

   const handleLogin = () => setToken(localStorage.getItem("access_token"));
   const handleLogout = () => {
      localStorage.removeItem("access_token");
      setToken(null);
   };

   return token ? (
      <PrivateRoutes onLogout={handleLogout} />
   ) : (
      <PublicRoutes onLogin={handleLogin} />
   );
}


export default App;
