import {Route, Routes} from 'react-router-dom';
import CalendarPage from 'pages/calendar-page/CalendarPage';
import Rooms from 'pages/rooms';
import {ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage} from 'pages';
import {MainLayout} from "../pages/layout/MainLayout";

const AppRouter = () => {

  return (
    <Routes>
      <Route path={"/"} element={<MainLayout/>}>
      <Route path={'/login'} element={<LoginPage />}></Route>
      <Route path={'/forgotPassword'} element={<ForgotPasswordPage />}></Route>
      <Route path={'/changePassword'} element={<ChangePasswordPage/>}></Route>
      <Route path={'/register'} element={<RegisterPage />}></Route>
      <Route path={'/getInvitation'} element={<VerifyEmailPage />}></Route>
      <Route path={"/rooms"} element={<Rooms />} />
      <Route path={"/calendar"} element={<CalendarPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter