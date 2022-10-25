import { Route, Routes } from 'react-router-dom';
import CalendarPage from 'pages/calendar-page/CalendarPage';
import Rooms from 'pages/rooms';
import { ProtectedPasswordChangeRoute } from './ProtectedPasswordChangeRoute';
import { ProtectedRegisterRoute } from './ProtectedRegisterRoute';
import { ProtectedGetInvitationRoute } from './ProtectedGetInvitationRoute';
import { ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage } from 'pages';
import NotFound from 'pages/not-found/NotFound';
import AppMain from 'containers/app-main/AppMain';

const AppRouter = () => {

  return (
    <Routes>
      <Route path={"*"} element={<NotFound />} />
      <Route path={"/"} element={<LoginPage />} />
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

      <Route path={"/*"} element={<AppMain />} >
        <Route path={"rooms"} element={<Rooms />} />
        <Route path={"calendar"} element={<CalendarPage />} />

      </Route>

    </Routes>
  )
}

export default AppRouter