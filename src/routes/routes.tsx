import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home/home';
import CalendarPage from 'pages/calendar-page/CalendarPage';
import Rooms from 'pages/rooms';
import { ProtectedPasswordChangeRoute } from './ProtectedPasswordChangeRoute';
import { ProtectedRegisterRoute } from './ProtectedRegisterRoute';
import { ProtectedGetInvitationRoute } from './ProtectedGetInvitationRoute';
import { ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage } from 'pages';
import MainLayout from 'pages/layout/MainLayout/MainLayout';

const AppRouter = () => {

  return (
    <Routes>
      <Route path={"/"} element={<MainLayout/>}>
      <Route path={'/login'} element={<LoginPage />}></Route>
      <Route path={'/forgotPassword'} element={<ForgotPasswordPage />}></Route>
      <Route path={'/changePassword'} element={
        <ProtectedPasswordChangeRoute redirect={'/'}>
          <ChangePasswordPage />
        </ProtectedPasswordChangeRoute>
      }></Route>
      <Route path={'/register'} element={
        <ProtectedRegisterRoute redirect="/login">
          <RegisterPage />
        </ProtectedRegisterRoute>
      }></Route>
      <Route path={'/getInvitation'} element={
        <ProtectedGetInvitationRoute redirect={'/'}>
          <VerifyEmailPage />
        </ProtectedGetInvitationRoute>
      }></Route>

      <Route path={"/rooms"} element={<Rooms />} />
      <Route path={"/calendar"} element={<CalendarPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter