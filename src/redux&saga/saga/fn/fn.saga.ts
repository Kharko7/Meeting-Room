import {ResponsePopup} from "../../../components/tools/simple/response-popup/ResponsePopup";
import {AxiosResponse} from "axios";
import {call, put} from "redux-saga/effects";
import {UserService} from "../../../services/user.service/user.service";
import {authService} from "../../../services/auth.service/auth.services";
import {UserProps} from "../../../interfaces/auth/AuthProps";
import jwt_decode from "jwt-decode";
import {authActions} from "../../slices/auth.slice";
import {setToLocalStorage} from "../../../services/local-storage.service";

export function* success(){
    yield ResponsePopup.Success();
    yield put(authActions.success(true));
}

export function* successResponseUser(token: string) {
    authService.setTokens(token)
    const decoded: UserProps = jwt_decode(token);
    yield put(authActions.setUser(decoded));
    yield success();
}

export function* fnLoginSaga(action: any) {
    yield ResponsePopup.Pending();
    const {data}: AxiosResponse = yield call(UserService.login, action.payload);
    yield successResponseUser(data.token);
    setToLocalStorage('user',JSON.stringify(jwt_decode(data.token)));
}

export function* fnErrorSaga(error: any) {
    yield put(authActions.errorMsg(error.response?.status));
    yield ResponsePopup.ErrorPopup(error);
}

export function* fnRegisterSaga(action: any) {
    yield ResponsePopup.Pending();
    const {data}: AxiosResponse = yield call(UserService.register, action.payload);
    yield success();
}

export function* fnGetInvitationSaga(action:any){
    yield ResponsePopup.Pending();
    const {data}: AxiosResponse = yield call(UserService.getInvitation, action.payload);
    yield success();
}