import { useAuth } from "hooks";
import {Navigate, Outlet, Route, useLocation, useNavigate} from "react-router-dom";
import {getFromLocalStorage, getUserData} from "../services/local-storage.service";
import {VerifyEmailPage} from "../pages";


export const useRole = () => {
    const {role} = getUserData();
    return role
}

export const AdminRoute = () => {
    const access = useAuth();
    const role = useRole();

    return access&&role==='admin' ? <Outlet/> : <Navigate to={'/rooms'} state={{ replace: true }}/>;
}