import {useAuth} from "hooks";
import {Navigate, Outlet} from "react-router-dom";


export const AuthRoute = () => {
    const access = useAuth();
    return !access ? <Outlet /> : <Navigate to={'/rooms'} state={{ replace: true }}/>;
}