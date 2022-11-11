
import { all } from 'redux-saga/effects';
import {loginSaga} from "./login.saga";
import {registerSaga} from "./register.saga";
import BookingSagas from './booking.saga';

export default function* rootSaga() {
    yield all([loginSaga(),registerSaga(),BookingSagas()]);
}