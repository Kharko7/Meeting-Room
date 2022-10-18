import {Navigate, useLocation} from "react-router-dom";

interface LayoutProps {
    redirect: string;
    children: JSX.Element;
}

export const ProtectedGetInvitationRoute =({children,redirect}:LayoutProps)=> {
    const accessToGetInvitation = localStorage.getItem("accessToGetInvitation");
    // const access: boolean = accessToGetInvitation && JSON.parse(accessToGetInvitation);
    const access = true;
    const location = useLocation();
    return access ? children : <Navigate to={redirect} state={{ from: location }} />;
}