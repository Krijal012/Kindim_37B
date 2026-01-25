import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <>
      {token ? (
        <PrivateRoutes onLogout={handleLogout} userRole={userRole} />
      ) : (
        <PublicRoutes onLogin={handleLogin} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
