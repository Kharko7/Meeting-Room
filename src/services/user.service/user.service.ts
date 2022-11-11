import {urls} from "../../constants/urls/urls";
import {axiosService} from "../axios.service/axios.service";
import {ChangePasswordProps, ForgotPasswordProps, LoginProps, RegistrationProps} from "../../interfaces/auth/AuthProps";

export const UserService = {
    login: async (data: LoginProps|string) => await axiosService.post(urls.login, data),
    register: async (data: RegistrationProps) => await axiosService.post(`${urls.register}`, data),
    changePassword: async ({id,password}:ChangePasswordProps) => await axiosService.post(`${urls.changePassword}/${id}`, password),
    forgotPassword: async ({email}: ForgotPasswordProps) => await axiosService.post(`${urls.forgotPassword}`, email),
    getInvitation:async (email:string[])=>await axiosService.post(`${urls.getInvitation}`,email)
};