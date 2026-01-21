import { Routes } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';


// Combine all routes
function AppRoutes() {
  return (
    <Routes>
      {PrivateRoutes}
      {PublicRoutes}
    </Routes>
  );
}

export default AppRoutes;