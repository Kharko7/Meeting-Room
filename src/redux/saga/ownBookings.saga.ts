import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

import { ownBookingsService } from "services/ownBookings.service";
import { getOwnBookingsError, getOwnBookingsSuccess } from "redux/slices/ownBookings.slice";
import { BookingResponse, GetOwnBookingsPayload } from "interfaces/OwnBookings";

dayjs.extend(utc);

function* workerGetOwnBookings(action: PayloadAction<GetOwnBookingsPayload>) {
  const { page } = action.payload
  try {
    const response: AxiosResponse = yield call(ownBookingsService.getOwnBookings, { url: `bookings/own?page=${page}&limit=5` })
    const { bookings, totalCount } = response.data

    const data = bookings.map((booking: BookingResponse) => ({
      title: booking.title,
      start: dayjs.utc(booking.startDateTime).format('YYYY-MM-DDTHH:mm'),
      end: dayjs.utc(booking.endDateTime).format('YYYY-MM-DDTHH:mm'),
      bookingId: booking.bookingId,
      roomId: booking.room_FK,
      description: booking.description,
      isRecurring: booking.isRecurring,
      invitations: booking.invitations,
      daysOfWeek: booking.daysOfWeek,
      creatorId: booking.creatorId_FK,
      recurringId: 0,
    }))

    yield put(getOwnBookingsSuccess({ bookings: data, totalCount }))
  } catch (error: any) {
    yield put(getOwnBookingsError(error.response.data?.message || error.response.statusText));
  }
}



export default function* OwnBookingsSaga() {
  yield takeEvery("ownBookings/getOwnBookings", workerGetOwnBookings);
}
