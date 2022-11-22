import { useAuth } from "hooks";
import {Navigate, Outlet, useLocation} from "react-router-dom";



export const AuthRoute = () => {
    const access = useAuth();
    console.log('auth')
    return !access ? <Outlet /> : <Navigate to={'/rooms'} state={{ replace: true }}/>;
}