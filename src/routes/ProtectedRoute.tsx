import {useAuth} from "hooks";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import {useRole} from "./AdminRoute";


export const ProtectedRoute = () => {
    const access = useAuth();
    console.log('protected')
    return access? <Outlet /> : <Navigate to={'/not-found'} state={{ replace: true }}/>;
}