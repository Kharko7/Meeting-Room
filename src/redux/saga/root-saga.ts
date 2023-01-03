import { all } from "redux-saga/effects";

import OwnBookingsSaga from "./ownBookings.saga";
import RoomSaga from "./room.saga";
import BookingSagas from "./booking.saga";
import UserSagas from "./user.saga";

export default function* rootSaga() {
  yield all([
    BookingSagas(),
    UserSagas(),
    OwnBookingsSaga(),
    RoomSaga(),
  ]);
}
