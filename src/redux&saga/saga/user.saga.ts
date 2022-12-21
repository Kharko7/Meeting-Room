import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { ChangePasswordInterface, Login, RecoveryPasswordInterface, RegisterInterface } from "interfaces/User";
import { UserService } from "services/user.service/user.service";
import { changePasswordError, changePasswordSuccess, recoveryPasswordError, recoveryPasswordSuccess, setLoading, userLoginError, userLoginSuccess, userSignupError, userSignupSuccess } from "redux&saga/slices/user.slice";
import { setToLocalStorage } from "services/local-storage.service";
import { Errors } from "constants/errors";
import { snackbarVariants } from "constants/snackbar";

function* workerUserLogin(action: PayloadAction<Login>) {
  try {
    const response: AxiosResponse = yield call(UserService.login, action.payload)
    const token = response.data.token
    yield put(userLoginSuccess(token))
    setToLocalStorage('token', token)
  } catch (error: any) {
    const errResponseMsg = error.response.data?.message
    if (errResponseMsg === 'Unauthorized') {
      yield put(userLoginError(Errors.unauthorized))
    } else {
      yield put(userLoginError(errResponseMsg || error.response.statusText))
    }
  }
}

function* workerUserSignup(action: PayloadAction<RegisterInterface>) {
  try {
    yield call(UserService.register, action.payload)
    yield put(userSignupSuccess('Registration was successful'))
  } catch (error: any) {
    yield put(userSignupError(error.response.data?.message || error.response.statusText))
  }
}

function* workerChangePassword(action: PayloadAction<ChangePasswordInterface>) {
  try {
    const response: AxiosResponse = yield call(UserService.changePassword, action.payload)
    console.log(response)
    yield put(changePasswordSuccess('Password has been changed'))
  } catch (error: any) {
    yield put(changePasswordError(error.response.data?.message || error.response.statusText))
  }
}

function* workerRecoveryPassword(action: PayloadAction<RecoveryPasswordInterface>) {
  try {
    const response: AxiosResponse = yield call(UserService.forgotPassword, action.payload)
    console.log(response)
    yield put(recoveryPasswordSuccess(true))
  } catch (error: any) {
    console.log(error)
    yield put(recoveryPasswordError(error.response.data?.message || error.response.statusText))
  }
}

function* workerInviteUsers(action: PayloadAction<any>) {
  try {
    const response: AxiosResponse = yield call(UserService.getInvitation, action.payload)
    console.log(response)
    //yield put(recoveryPasswordSuccess(true))
  } catch (error: any) {
    console.log(error)
    // yield put(recoveryPasswordError(error.response.data?.message || error.response.statusText))
  }
}


export default function* UserSagas() {
  yield takeEvery("user/userLogin", workerUserLogin);
  yield takeEvery("user/userSignup", workerUserSignup);
  yield takeEvery("user/changePassword", workerChangePassword);
  yield takeEvery("user/recoveryPassword", workerRecoveryPassword);
  yield takeEvery("user/inviteUsers", workerInviteUsers);
}
