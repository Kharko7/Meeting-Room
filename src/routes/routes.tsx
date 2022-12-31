import { Route, Routes } from 'react-router-dom';

import NotFound from 'pages/not-found/NotFound';
import AppMain from "../containers/app-main/AppMain";
import CalendarPage from "../pages/calendar-page";
import Profile from "../pages/profile";
import PrivateRoute from './PrivateRoute';
import { Role } from 'interfaces/User';
import Login from 'pages/login';
import Register from 'pages/register';
import ResetPassword from 'pages/reset-password';
import SendInvitation from 'pages/send-invitation';
import Room from 'pages/room';

interface AppRouterProps {
    role: Role | null;
    loading: boolean;
}

const AppRouter = ({ role, loading }: AppRouterProps) => {

    return (
        <Routes>
            <Route path={'login'} element={<Login />}></Route>
            <Route path={'resetPassword'} element={<ResetPassword />}></Route>
            <Route path={'register/email=:email'} element={<Register />}></Route>
            <Route path={'sendInvitation'} element={<SendInvitation />}></Route>
            <Route element={<PrivateRoute role={role} loading={loading} />}>
                <Route path={"/"} element={<AppMain />} >
                    <Route path={"calendar"} element={<CalendarPage />} />
                    <Route path={"room"} element={<Room />} />
                </Route>
                <Route path={"profile"} element={<Profile />} />
            </Route>
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter