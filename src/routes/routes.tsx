import { Route, Routes } from 'react-router-dom';

import { ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage } from 'pages';
import NotFound from 'pages/not-found/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import AppMain from "../containers/app-main/AppMain";
import Rooms from "../pages/rooms";
import CalendarPage from "../pages/calendar-page";
import Profile from "../pages/profile";
import { AuthRoute } from "./AuthRoute";
import { AdminRoute } from "./AdminRoute";
import PrivateRoute from './protected/PrivateRoute';
import { Role } from 'interfaces/User';
import Login from 'pages/login';
import Register from 'pages/register';
import ResetPassword from 'pages/reset-password';
import SendInvitation from 'pages/send-invitation';

interface AppRouterProps {
    role: Role | null;
    loading: any;
}

const AppRouter = ({ role, loading }: AppRouterProps) => {

    return (
        <Routes>
            <Route element={<PrivateRoute role={role} loading={loading} />}>
                <Route path={"/"} element={<AppMain />} >
                    <Route path={"rooms"} element={<Rooms />} />
                    <Route path={"calendar"} element={<CalendarPage />} />
                </Route>
                <Route path={"profile"} element={<Profile />} />
            </Route>



            <Route path={'login'} element={<Login />}></Route>
            <Route path={'resetPassword'} element={<ResetPassword />}></Route>
            <Route path={'register/email=:email'} element={<Register />}></Route>
            <Route path={'sendInvitation'} element={<SendInvitation />}></Route>



            <Route path={'auth/login'} element={<LoginPage />}></Route>
            <Route path={'auth/signup/email=:email'} element={<RegisterPage />}></Route>
            <Route path={'auth/forgotPassword'} element={<ForgotPasswordPage />}></Route>
            <Route path={'getInvitation'} element={<VerifyEmailPage />}></Route>

            {/* <Route path='' element={<ProtectedRoute />}>
                <Route path={"/"} element={<AppMain />} >
                    <Route path={"rooms"} element={<Rooms />} />
                    <Route path={"calendar"} element={<CalendarPage />} />
                </Route>
                <Route path={"/profile"} element={<Profile />} />
                <Route path={'/admin'} element={<AdminRoute />}>
                    <Route path={'getInvitation'} element={<VerifyEmailPage />}></Route>
                </Route>
            </Route> */}

            <Route element={<ProtectedRoute />}>
                <Route path={"/re"} element={<AppMain />} >
                    <Route path={"rooms"} element={<Rooms />} />
                    <Route path={"calendar"} element={<CalendarPage />} />
                </Route>
                <Route path={"/profile"} element={<Profile />} />
                <Route path={'/admin'} element={<AdminRoute />}>
                    <Route path={'getInvitation'} element={<VerifyEmailPage />}></Route>
                </Route>
            </Route>

            <Route path={"*"} element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter