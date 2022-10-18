import {Navigate, useLocation} from "react-router-dom";

interface LayoutProps {
    redirect: string;
    children: JSX.Element;
}

export const ProtectedPasswordChangeRoute =({children,redirect}:LayoutProps)=> {
    const accessToPasswordChange = localStorage.getItem("accessPasswordChange");
    // const access: boolean = accessToPasswordChange && JSON.parse(accessToPasswordChange);
    const access = true;
    const location = useLocation();
    return access ? children : <Navigate to={redirect} state={{ from: location }} />;
}