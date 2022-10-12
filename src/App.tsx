import {Route, Routes} from 'react-router-dom';
import './app.scss';
import {ChangePasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, VerifyEmailPage} from "./pages";

const App = () => {

  return (
    <div className="App">
        <Routes>
          <Route path={'/login'} element={<LoginPage/>}></Route>
          <Route path={'/register'} element={<RegisterPage/>}></Route>
          <Route path={'/verifyAccount'} element={<VerifyEmailPage/>}></Route>
          <Route path={'/forgotPassword'} element={<ForgotPasswordPage/>}></Route>
          <Route path={'/changePassword'} element={<ChangePasswordPage/>}></Route>
        </Routes>
      </div>);
};

export default App;