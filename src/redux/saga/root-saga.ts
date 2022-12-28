import { all } from "redux-saga/effects";
import OwnBookingsSaga from "./ownBookings.saga";
import { roomsSaga } from "./rooms.saga";
import BookingSagas from "./booking.saga";
import UserSagas from "./user.saga";

export default function* rootSaga() {
  yield all([
    roomsSaga(),
    BookingSagas(),
    UserSagas(),
    OwnBookingsSaga(),
  ]);
}
