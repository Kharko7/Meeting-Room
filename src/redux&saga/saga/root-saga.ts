import { all } from "redux-saga/effects";
import { loginSaga } from "./login.saga";
import { registerSaga } from "./register.saga";
import { ownBookingsSaga } from "./ownBookings.saga";
import { roomsSaga } from "./rooms.saga";
import { forgotPasswordSaga } from "./forgotPassword.saga";
import { changePasswordSaga } from "./changePassword.saga";
import { GetInvitationSaga } from "./getInvitation.saga";
import BookingSagas from "./booking.saga";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    ownBookingsSaga(),
    roomsSaga(),
    forgotPasswordSaga(),
    changePasswordSaga(),
    GetInvitationSaga(),
    BookingSagas(),
  ]);
}
