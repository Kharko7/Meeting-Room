import {Navigate, RouteProps, useLocation} from "react-router-dom";

interface LayoutProps {
    redirect: string;
    children: JSX.Element;
}

export const ProtectedRegisterRoute=({children,redirect}:LayoutProps)=> {
    const accessToRegister = localStorage.getItem("accessToRegister");
    const access: boolean = accessToRegister && JSON.parse(accessToRegister);
    const location = useLocation();
    return access ? children : <Navigate to={redirect} state={{ from: location }} />;
}