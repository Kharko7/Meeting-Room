import { all } from 'redux-saga/effects';
import {loginSaga} from "./login.saga";
import {registerSaga} from "./register.saga";
import {forgotPasswordSaga} from "./forgotPassword.saga";
import {changePasswordSaga} from "./changePassword.saga";
import {GetInvitationSaga} from "./getInvitation.saga";

export default function* rootSaga() {
    yield all([loginSaga(),registerSaga(),forgotPasswordSaga(),changePasswordSaga(),GetInvitationSaga()]);
}