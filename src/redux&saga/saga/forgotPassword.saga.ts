import {call, put, take, takeLatest,fork} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {ServerResponse} from "http";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {authService} from "../../services/auth.service/auth.services";

function* handleForgotPassword(action:any) {
    try {
        console.log("work")
        yield ResponsePopup.Pending();
        yield put(authActions.forgotPasswordSendEmail(action.payload))
        yield ResponsePopup.Success();
    } catch (error: any) {
        yield put(authActions.errorMsg(error.response.status))
        yield ResponsePopup.ErrorPopup(error);
    }
}

function* watchLoginFlow() {
    while (true) {
        const action: PayloadAction<any> = yield take(
            authActions.forgotPasswordSendEmail.type
        );
        yield fork(handleForgotPassword, action);
    }
}

export function* forgotPasswordSaga() {
    yield fork(watchLoginFlow);
}