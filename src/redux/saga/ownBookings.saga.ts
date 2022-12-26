import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { ChangePasswordInterface, InviteUsersInterface, Login, RecoveryPasswordInterface, RegisterInterface } from "interfaces/User";
import { AuthService } from "services/auth.service";
import {
  changePasswordError,
  changePasswordSuccess,
  recoveryPasswordError,
  recoveryPasswordSuccess,
  setLoading,
  setNotification,
  userLoginError,
  userLoginSuccess,
  userSignupError,
  userSignupSuccess
} from "redux/slices/user.slice";
import { setToLocalStorage } from "services/local-storage.service";
import { Errors } from "constants/errors";
import { snackbarVariants } from "constants/snackbar";

function* workerUserLogin(action: PayloadAction<Login>) {
  try {
    const response: AxiosResponse = yield call(AuthService.login, action.payload)
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
    yield call(AuthService.register, action.payload)
    yield put(userSignupSuccess('Registration was successful'))
  } catch (error: any) {
    yield put(userSignupError(error.response.data?.message || error.response.statusText))
  }
}

function* workerChangePassword(action: PayloadAction<ChangePasswordInterface>) {
  try {
    yield call(AuthService.changePassword, action.payload)
    yield put(changePasswordSuccess('Password has been changed'))
  } catch (error: any) {
    yield put(changePasswordError(error.response.data?.message || error.response.statusText))
  }
}

function* workerRecoveryPassword(action: PayloadAction<RecoveryPasswordInterface>) {
  try {
    const response: AxiosResponse = yield call(AuthService.recoveryPassword, action.payload)
    console.log(response)
    yield put(recoveryPasswordSuccess(true))
  } catch (error: any) {
    console.log(error)
    yield put(recoveryPasswordError(error.response.data?.message || error.response.statusText))
  }
}

function* workerInviteUsers(action: PayloadAction<InviteUsersInterface[]>) {
  try {
    yield call(AuthService.sendInvitation, action.payload)
    yield put(setNotification({ status: snackbarVariants.success, message: 'User(s) was invited' }))
    yield put(setLoading(false))
  } catch (error: any) {
    console.log(error)
    yield put(setNotification({
      status: snackbarVariants.error,
      message: error.response.data?.message || error.response.statusText
    }))
    yield put(setLoading(false))
  }
}


export default function* UserSagas() {
  yield takeEvery("user/userLogin", workerUserLogin);
  yield takeEvery("user/userSignup", workerUserSignup);
  yield takeEvery("user/changePassword", workerChangePassword);
  yield takeEvery("user/recoveryPassword", workerRecoveryPassword);
  yield takeEvery("user/inviteUsers", workerInviteUsers);
}
