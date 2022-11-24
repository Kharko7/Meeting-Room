import {call, fork, put, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {UserService} from "../../services/user.service/user.service";
import {fnErrorSaga, pending, success} from "./fn/fn.saga";

function* handleGetInvitation(action:PayloadAction<any>) {
    try {
        yield pending();
        const {data}: AxiosResponse = yield call(UserService.getInvitation, action.payload);
        yield success();
        yield put(authActions.success(false));
    } catch (error: any) {
        console.log(error)
       yield fnErrorSaga(error);
    }
}

function* watchGetInvitationFlow() {
    while (true) {
        const action: PayloadAction<any> = yield take(
            authActions.getInvitation.type
        );
        yield fork(handleGetInvitation, action);
    }
}

export function* GetInvitationSaga() {
    yield fork(watchGetInvitationFlow);
}