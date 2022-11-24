import { call, put, all, fork, take, takeLatest } from "redux-saga/effects";
import { ownBookingsActions } from "redux&saga/slices/ownBookings.slice";
import { AxiosResponse } from "axios";
import { OwnBookingsService } from "../../services/room.service/ownBookings.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { AnyNaptrRecord } from "dns";
function* workerOwnBookings(a: any) {
  try {
    const data: AxiosResponse = yield call(
      OwnBookingsService.getOwnBookings,
      a.payload
    );
    yield put(ownBookingsActions.setOwnBookings(data?.data.bookings));
  } catch (error) {
    console.log(error);
  }
}
function* workerTotalCounts(a: any) {
  try {
    const data: AxiosResponse = yield call(
      OwnBookingsService.getOwnBookings,
      a.payload
    );
    const total = {
      totalCount: data?.data.totalCount,
      limit: data?.data.limit,
    };

    yield put(ownBookingsActions.setTotal(total));
    yield put(ownBookingsActions.setOwnBookings(data?.data.bookings));
  } catch (error) {
    console.log(error);
  }
}

function* watchTotalCounts() {
  while (true) {
    const action: PayloadAction = yield take(ownBookingsActions.getTotal.type);
    yield fork(workerTotalCounts, action);
  }
}
function* watchOwnBookings() {
  while (true) {
    const action: PayloadAction = yield take(
      ownBookingsActions.getOwnBookings.type
    );
    yield fork(workerOwnBookings, action);
  }
}
export function* ownBookingsSaga() {
  yield all([fork(watchOwnBookings), fork(watchTotalCounts)]);
}
