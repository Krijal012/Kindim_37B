import { useState, useEffect } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const [token, setToken] = useState(null);

  // Check localStorage when app loads
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    setToken(savedToken);
  }, []);

  return (
    <>
      {token ? (
        <PrivateRoutes />
      ) : (
        <PublicRoutes onLogin={() => setToken(localStorage.getItem("access_token"))} />
      )}
    </>
  );
}

export default App;



// import './App.css'
// // import Hoodie from './description/Hoodie';

// // import Tshirt from './description/Tshirt';  
// // import Sneaker from './description/Sneaker';
// // import Wallclock from './description/Wallclock';
// // import Headphone from './description/Headphone';
// // import CategoryPage from './pages/categorypage';
// // import ErrorPage from './errorpage';
// // // import ErrorPage from './pages/errorpage';
// // import Facewash from './description/Facewash';
// // import Hat from './description/Hat';
// import Candles from './description/Candles';
// // import Jeans from './description/Jeans';
// // import Vase from './description/Vase';
// // import Indoorplant from './description/Indoorplant';
// // import Guitar from './description/Guitar';
// // import Microphone from './description/Microphone';
// // import Dj from './description/Dj';
// // import Drumpad from './description/Drumpad';
// // import Flute from './description/Flute';
// // import Piano from './description/Piano';
// // import Tv from './description/Tv';
// // import  Smartwatch from './description/Smartwatch';
// // import  Speaker from './description/Speaker';
// // import  Ps5 from './description/Ps5';
// // import Ukelele from './description/Ukelele';
// // import Laptop from './description/Laptop';
// // import Decorative from './description/Decorative';
// // import Tablelamp from './description/Tablelamp';
// // import Jacket from './description/Jacket';
// // import Faceclean from './description/faceclean';
// // import Denver from './description/Denver';
// // import Mamaearth from './description/Mamaearth';
// // import Poshperfumes from './description/Poshperfumes';
// // import OrderHistorypage from './pages/Orderhistorypage';




// function App() {
//   return (
//     <>
//     <Candles/>
 
//     </>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";
// import PublicRoutes from "./routes/PublicRoutes";
// import PrivateRoutes from "./routes/PrivateRoutes";
// import Candles from "./description/Candles"; // <-- this is the import

// function App() {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("access_token");
//     setToken(savedToken);
//   }, []);

//   return (
//     <>
//       {token ? (
//         <PrivateRoutes>
//           <Candles /> {/* This page will show after login */}
//         </PrivateRoutes>
//       ) : (
//         <PublicRoutes onLogin={() => setToken(localStorage.getItem("access_token"))} />
//       )}
//     </>
//   );
// }

// export default App;
