import {call, put, take, takeLatest,fork} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ErrorPopup} from "../../components/tools/simple/error-popup/ErrorPopup";
import {ServerResponse} from "http";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {authService} from "../../services/auth.service/auth.services";

function* handleLogin(action:any) {
    try {
        console.log("work")
        const {data}:AxiosResponse = yield call(UserService.login,action.payload);
        console.log(data.token)
        authService.setTokens(data.token)

        // yield put(
        //     authActions.login(action.payload))
    } catch (error: any) {
        yield ErrorPopup(error.message)
        console.log(error)
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

export function* authSaga() {
    yield fork(watchLoginFlow);
}