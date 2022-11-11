import {call, fork, put, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {fnErrorSaga, fnRegisterSaga} from "./fn/fn.saga";

function* handleRegister(action: any) {
    try {
        yield fnRegisterSaga(action);
    } catch (error: any) {
        yield fnErrorSaga(error);
    }
}

function* watchRegisterFlow() {
    while (true) {
        const action: PayloadAction<LoginProps> = yield take(
            authActions.register.type
        );
        yield fork(handleRegister, action);
    }
}

export function* registerSaga() {
    yield fork(watchRegisterFlow);
}