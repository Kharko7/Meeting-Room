import { urls } from "../../constants/urls/urls";
import { axiosService } from "../axios.service/axios.service";
import {
    ForgotPasswordProps,
    LoginProps,
    PasswordChange,
    RegistrationProps
} from "../../interfaces/auth/AuthProps";

export const UserService = {
    login: (data: LoginProps | string) => axiosService.post(urls.login, data),
    register: (data: RegistrationProps) => axiosService.post(urls.register, data),
    changePassword: (data: PasswordChange) => axiosService.post(urls.changePassword, data),
    forgotPassword: (data: ForgotPasswordProps) => axiosService.post(urls.forgotPassword, data),
   
    getInvitation: async (email: string[]) => await axiosService.post(`${urls.getInvitation}`, email)
};