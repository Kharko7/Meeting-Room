import {call, fork, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {fnErrorSaga, pending, setJWT, success} from "./fn/fn.saga";
import {AxiosResponse} from "axios";
import {UserService} from "../../services/user.service/user.service";

function* handleLogin(action:PayloadAction<any>) {
    try {
        yield pending();
        const {data}: AxiosResponse = yield call(UserService.login, action.payload);
        yield setJWT(data.token);
        yield success();
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
