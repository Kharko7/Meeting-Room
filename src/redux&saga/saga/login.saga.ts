import {call, put, take, takeLatest,fork} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {ServerResponse} from "http";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {authService} from "../../services/auth.service/auth.services";

function* handleLogin(action:any) {
    try {




        console.log("work")
        // yield put(authActions.pending(true))
        yield ResponsePopup.Pending()
        const {data}:AxiosResponse = yield call(UserService.login,action.payload);
        // yield put(authActions.pending(false))
        console.log(data.token)
        authService.setTokens(data.token)
        // yield put(authActions.success(true))
       yield ResponsePopup.Success()
    } catch (error: any) {
        // yield put(authActions.pending(false))
        // yield put(authActions.errorMsg(error.message))
        yield ResponsePopup.ErrorPopup(error)
    }
}

function* watchLoginFlow() {
    while (true) {
            const action: PayloadAction<LoginProps> = yield take(
                authActions.login.type
            );
            yield fork(handleLogin, action);
    }
}

export function* loginSaga() {
    yield fork(watchLoginFlow);
}