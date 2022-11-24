import {call, fork, put, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {authService} from "../../services/auth.service/auth.services";
import {fnErrorSaga, pending, success} from "./fn/fn.saga";

function* handleChangePassword(action:PayloadAction<any>) {
    try {
        yield pending();
        const data: AxiosResponse = yield call(UserService.changePassword, action.payload);
        yield success();
    } catch (error: any) {
        console.log(error)
        yield fnErrorSaga(error);
    }
}

function* watchLoginFlow() {
    while (true) {
        const action: PayloadAction<any> = yield take(
            authActions.changePassword.type
        );
        yield fork(handleChangePassword, action);
    }
}

export function* changePasswordSaga() {
    yield fork(watchLoginFlow);
}