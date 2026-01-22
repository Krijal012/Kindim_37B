import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';


// Combine all routes
function AppRoutes(props) {
  return (
    <>
      <PrivateRoutes {...props} />
      <PublicRoutes {...props} />
    </>
  );
}

export default AppRoutes;