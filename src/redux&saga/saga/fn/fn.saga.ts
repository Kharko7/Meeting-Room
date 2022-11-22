import {ResponsePopup} from "../../../components/tools/simple/response-popup/ResponsePopup";
import {AxiosError} from "axios";
import {put} from "redux-saga/effects";
import {authService} from "../../../services/auth.service/auth.services";
import {UserProps} from "../../../interfaces/auth/AuthProps";
import jwt_decode from "jwt-decode";
import {authActions} from "../../slices/auth.slice";

export function* success() {
    yield pendingFalse()
    yield ResponsePopup.Success();
    yield put(authActions.success(true));
}

export function* fnErrorSaga(error: AxiosError<any>) {
    yield pendingFalse()
    yield put(authActions.errorMsg(error.response?.status));
    yield ResponsePopup.ErrorPopup(error.response?.data.message ? error.response?.data.message:error.message);
    yield errorFalse();
}

export function* pending() {
    yield errorFalse();
    yield put(authActions.success(false));
    yield put(authActions.pending(true));
    yield ResponsePopup.Pending();
}

export function* pendingFalse() {
    yield put(authActions.pending(false));
}

export function* errorFalse() {
    yield put(authActions.errorMsg(undefined));
}

export function* setJWT(token: string) {
    yield errorFalse();
    authService.setTokens(token)
    const decoded: UserProps = jwt_decode(token);
    yield put(authActions.setUser(decoded));
    yield pendingFalse()
}


