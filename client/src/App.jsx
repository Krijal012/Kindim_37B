import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const handleLogin = () => {
    setToken(localStorage.getItem("access_token"));
    setUserRole(localStorage.getItem("userRole"));
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUserRole(null);
  };

  return token ? (
    <PrivateRoutes onLogout={handleLogout} userRole={userRole} />
  ) : (
    <PublicRoutes onLogin={handleLogin} />
  );
}

export default App;