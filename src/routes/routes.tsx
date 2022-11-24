import {Route, Routes} from 'react-router-dom';
import {ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage} from 'pages';
import NotFound from 'pages/not-found/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import AppMain from "../containers/app-main/AppMain";
import Rooms from "../pages/rooms";
import CalendarPage from "../pages/calendar-page";
import Profile from "../pages/profile";
import {AuthRoute} from "./AuthRoute";
import {AdminRoute} from "./AdminRoute";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={"*"} element={<NotFound/>}/>
            <Route path={'/auth'} element={<AuthRoute/>}>
                <Route path={'login'} element={<LoginPage/>}></Route>
                <Route path={'signup/email=:email'} element={<RegisterPage/>}></Route>
                <Route path={'forgotPassword'} element={<ForgotPasswordPage/>}></Route>
            </Route>
            <Route path='' element={<ProtectedRoute />}>
                <Route path={"/"} element={<AppMain />} >
                  <Route path={"rooms"} element={<Rooms />} />
                  <Route path={"calendar"} element={<CalendarPage />} />
                </Route>
                <Route path={"/profile"} element={<Profile />} />
                <Route path={'/admin'} element={<AdminRoute/>}>
                    <Route path={'getInvitation'} element={<VerifyEmailPage/>}></Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter