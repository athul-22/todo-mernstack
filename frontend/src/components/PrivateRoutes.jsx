import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/auth" />;
  console.log({ auth });

  if (auth === undefined) return 'loading...';

  return auth === true ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;