import {call, fork, take} from 'redux-saga/effects';
import {authActions} from 'redux&saga/slices/auth.slice';
import {UserService} from "../../services/user.service/user.service";
import {LoginProps} from "../../interfaces/auth/AuthProps";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {fnErrorSaga, pending, success} from "./fn/fn.saga";

function* handleRegister(action: PayloadAction<any>) {
    try {
        yield pending();
        const data: AxiosResponse = yield call(UserService.register, action.payload);
        yield success();
    } catch (error:any) {
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
