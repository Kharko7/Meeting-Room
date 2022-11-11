import {call, fork, put, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {UserService} from "../../services/user.service/user.service";
import {fnErrorSaga, fnGetInvitationSaga} from "./fn/fn.saga";

function* handleGetInvitation(action:any) {
    try {
       yield fnGetInvitationSaga(action);
    } catch (error: any) {
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