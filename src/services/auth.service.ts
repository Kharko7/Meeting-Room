import { axiosService } from "./axios.service/axios.service";
import { urls } from "constants/request";
import {
    Login,
    RegisterInterface,
    ChangePasswordInterface,
    RecoveryPasswordInterface,
    InviteUsersInterface
} from "interfaces/User";

export const AuthService = {
    login: (data: Login) => axiosService.post(urls.login, data),
    register: (data: RegisterInterface) => axiosService.post(urls.register, data),
    changePassword: (data: ChangePasswordInterface) => axiosService.post(urls.changePassword, data),
    recoveryPassword: (data: RecoveryPasswordInterface) => axiosService.post(urls.forgotPassword, data),
    sendInvitation: (email: InviteUsersInterface[]) => axiosService.post(urls.sendInvitation, email)
};