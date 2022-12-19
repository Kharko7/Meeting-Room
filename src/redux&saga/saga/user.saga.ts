import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { Login } from "interfaces/User";
import { UserService } from "services/user.service/user.service";
import { userLoginError, userLoginSuccess } from "redux&saga/slices/user.slice";
import { setToLocalStorage } from "services/local-storage.service";

export function* userLogin(action: PayloadAction<Login>) {
  try {
    const response: AxiosResponse = yield call(UserService.login, action.payload)
    const token = response.data.token
    yield put(userLoginSuccess(token))
    setToLocalStorage('token', token)
  } catch (error: any) {
    yield put(userLoginError(error.response.data?.message || error.response.statusText))
  }
}


export default function* UserSagas() {
  yield takeEvery("user/userLogin", userLogin);
}
