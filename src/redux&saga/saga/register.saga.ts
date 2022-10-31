import {call, fork, put, take} from 'redux-saga/effects';
import {authActions} from '../slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";

function* handleRegister(action:any) {
    try {
        // yield ResponsePopup.Pending()
        yield put(authActions.pending(true))
        const data:AxiosResponse = yield call(UserService.register,action.payload);
        yield put(authActions.pending(false))
        console.log(data)
        yield put(authActions.success(true))
        // yield ResponsePopup.Success()
    } catch (error: any) {
        yield put(authActions.pending(false))
        yield put(authActions.errorMsg(error.message))
        // yield ResponsePopup.ErrorPopup(error)
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