import {Route, Routes} from 'react-router-dom';
import './app.scss';
import {ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage} from "./pages";
import {ProtectedGetInvitationRoute, ProtectedPasswordChangeRoute, ProtectedRegisterRoute} from "./routes";
import {MainLayout} from "./pages/layout/MainLayout";
import Rooms from "./pages/rooms";


const App = () => {
    return (
    <div className="App">
        <Routes>
            <Route path={"/"} element={<MainLayout/>}>
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

                <Route path={"/rooms"} element={<Rooms/>}>

                </Route>
            </Route>
        </Routes>
      </div>);
};

export default App;


