import {Route, Routes} from 'react-router-dom';
import CalendarPage from 'pages/calendar-page/CalendarPage';
import Rooms from 'pages/rooms';
import {ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage} from 'pages';
import NotFound from 'pages/not-found/NotFound';
import AppMain from 'containers/app-main/AppMain';
import Profile from 'pages/profile/Profile';

const AppRouter = () => {

  return (
    <Routes>
      <Route path={"*"} element={<NotFound />} />
      <Route path={'/login'} element={<LoginPage />}></Route>
      <Route path={'/register'} element={<RegisterPage />}></Route>
      <Route path={'/changePassword'} element={<ChangePasswordPage/>}></Route>
      <Route path={'/getInvitation'} element={<VerifyEmailPage/>}></Route>
      <Route path={'/forgotPassword'} element={<ForgotPasswordPage />}></Route>
      <Route path={"/*"} element={<AppMain />} >
        <Route path={"rooms"} element={<Rooms />} />
        <Route path={"calendar"} element={<CalendarPage />} />
      </Route>
      <Route path={"/profile"} element={<Profile />} />

    </Routes>
  )
}

export default AppRouter