import {urls} from "../../constants/urls/urls";
import {axiosService} from "../axios.service/axios.service";
import {
    ForgotPasswordProps,
    LoginProps,
    PasswordChange,
    RegistrationProps
} from "../../interfaces/auth/AuthProps";

export const UserService = {
    login: async (data: LoginProps|string) => await axiosService.post(urls.login, data),
    register: async (data: RegistrationProps) => await axiosService.post(`${urls.register}`, data),
    changePassword: async (data:PasswordChange) => {
        return await axiosService.post(`${urls.changePassword}`, data);
    },
    forgotPassword: async (data:ForgotPasswordProps) => {
        return await axiosService.post(`${urls.forgotPassword}`, data)},
    getInvitation:async (email:string[])=>await axiosService.post(`${urls.getInvitation}`,email)
};