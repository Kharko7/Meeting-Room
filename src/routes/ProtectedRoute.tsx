import {useAuth} from "hooks";
import {Navigate, Outlet} from "react-router-dom";


export const ProtectedRoute = () => {
    const access = useAuth();
    return access? <Outlet /> : <Navigate to={'/not-found'} state={{ replace: true }}/>;
}