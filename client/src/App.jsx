import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
   // Check if user is logged in by checking localStorage token
   const [token, setToken] = useState(localStorage.getItem("access_token"));

   // Function to update token state after login
   const handleLogin = () => {
      setToken(localStorage.getItem("access_token"));
   };

   // Function to handle logout
   const handleLogout = () => {
      localStorage.removeItem("access_token");
      setToken(null);
   };

   return (
      <>
         {/* If token exists, show private routes. Otherwise show public routes */}
         {token ? (
            <PrivateRoutes onLogout={handleLogout} />
         ) : (
            <PublicRoutes onLogin={handleLogin} />
         )}
      </>
   );
}

export default App;
