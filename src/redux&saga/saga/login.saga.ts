import {fork, put, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {ResponsePopup} from "../../components/tools/simple/response-popup/ResponsePopup";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {fnErrorSaga, fnLoginSaga} from "./fn/fn.saga";

function* handleLogin(action:any) {
    try {
        yield fnLoginSaga(action);
    } catch (error: any) {
       yield fnErrorSaga(error);
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
