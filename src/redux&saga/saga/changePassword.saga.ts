import {call, fork, put, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {authService} from "../../services/auth.service/auth.services";

function* handleChangePassword(action:any) {
    try {
        console.log("work")
        yield ResponsePopup.Pending()
        yield put(authActions.changePassword(action.payload))
        yield ResponsePopup.Success()
    } catch (error: any) {
        yield put(authActions.errorMsg(error.response.status))
        yield ResponsePopup.ErrorPopup(error);
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