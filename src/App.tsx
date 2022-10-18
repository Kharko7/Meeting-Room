import {Link, Route, Routes} from 'react-router-dom';
import './app.scss';
import {ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage} from "./pages";
import {useForm} from "react-hook-form";
import {ProtectedGetInvitationRoute, ProtectedPasswordChangeRoute, ProtectedRegisterRoute} from "./routes";


const App = () => {
    return (
    <div className="App">


        <div className={"routes"}>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/changePassword"}>Change Password</Link>
            <Link to={"/getInvitation"}>Get Invitation</Link>
            <Link to={"/calendar"}>Calendar</Link>
            <Link to={"/rooms"}>Rooms</Link>
        </div>




        <Routes>
            <Route path={'/login'} element={<LoginPage/>}></Route>
            <Route path={'/forgotPassword'} element={<ForgotPasswordPage/>}></Route>


            <Route path={'/changePassword'} element={
                <ProtectedPasswordChangeRoute redirect={'/'}>
                    <ChangePasswordPage/>
                </ProtectedPasswordChangeRoute>
            }></Route>

            <Route path={'/register'} element={
                <ProtectedRegisterRoute redirect="/login">
                    <RegisterPage/>
                </ProtectedRegisterRoute>
            }></Route>

            <Route path={'/getInvitation'} element={
                <ProtectedGetInvitationRoute redirect={'/'}>
                    <VerifyEmailPage/>
                </ProtectedGetInvitationRoute>
            }></Route>
        </Routes>
      </div>);
};

export default App;


