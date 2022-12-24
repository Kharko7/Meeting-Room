import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Role } from "interfaces/User"

interface ProtectedRouteProps {
  role: Role | null;
  loading: boolean;
}

const PrivateRoute = ({ role, loading }: ProtectedRouteProps) => {
  const location = useLocation()
  if (loading && !role) {
    return null
  }
  return role
    ? <Outlet />
    : <Navigate to='/login' state={{ from: location }} />;
}

export default PrivateRoute