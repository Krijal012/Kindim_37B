
import { useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";






function App() {
  
   const [token, setToken] = useState(localStorage.getItem("access_token"));

  return (
  <>
   {token ? (
    <PrivateRoutes /> 
   ):(

    <PublicRoutes onLogin={() => setToken(localStorage.getItem("access_token"))} />
)}
</>
  );

}

export default App;
