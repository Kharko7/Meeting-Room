import {call, fork, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {fnErrorSaga, pending, success} from "./fn/fn.saga";
import {ForgotPasswordProps} from "../../interfaces/auth/AuthProps";

function* handleForgotPassword(action:PayloadAction<ForgotPasswordProps>) {
    try {
        yield pending();
        const data: AxiosResponse = yield call(UserService.forgotPassword, action.payload);
        yield success();
    } catch (error: any) {
        yield fnErrorSaga(error);
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