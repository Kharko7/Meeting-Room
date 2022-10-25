import {Navigate, useLocation} from "react-router-dom";

interface LayoutProps {
    children: JSX.Element;
}

const useAuth = () => {
    const user = localStorage.getItem('access')
    const access: boolean | null = user && JSON.parse(user);
    return access;
}

export const ProtectedRoute = ({children}: LayoutProps) => {
    const access = useAuth();
    const location = useLocation();
    return access ? children : <Navigate to={'/'} state={{from: location}}/>;
}
