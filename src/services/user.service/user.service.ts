import {urls} from "../../constants/urls/urls";
import {axiosService} from "../axios.service/axios.service";
import {ChangePasswordProps, ForgotPasswordProps, LoginProps, RegistrationProps} from "../../interfaces/auth/AuthProps";
import 'animate.css';


export const UserService = {
    login: async (data: LoginProps) => await axiosService.post(urls.login, data),

    register: async (data: RegistrationProps) => await axiosService.post(`${urls.register}`, data),

    changePassword: async ({id,password}:ChangePasswordProps) => await axiosService.post(`${urls.changePassword}/${id}`, password),

    forgotPassword: async ({email}: ForgotPasswordProps) => await axiosService.post(`${urls.forgotPassword}`, email)
};