import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RoomBookingPopup } from "pages/rooms/PopupRoom";
import {
  addBookingSuccess,
  deleteBookingSuccess,
  getAllBookingsSuccess,
  setBookingError,
  setLoading,
  editOneBookingSuccess,
  editRecurringBookingSuccess,
} from "redux&saga/slices/booking.slice";
import dayjs from "dayjs";
import { ownBookingsActions } from "redux&saga/slices/ownBookings.slice";
import utc from "dayjs/plugin/utc";
import {
  DeleteBookingInterface,
  OneBooking,
  EditRecurringBooking,
  AddRecurringBooking,
} from "interfaces/booking/Booking";
import { bookingService } from "services/booking.service/booking.service";

dayjs.extend(utc);

export function* getAllBookings(action: PayloadAction<Record<string, string | number>>) {
  const { startDate, endDate, roomId } = action.payload
  try {
    const response: AxiosResponse = yield call(bookingService.get, { url: `bookings?roomId=${roomId ? roomId : '*'}&startDate=${startDate}&endDate=${endDate}` })
    const data = response.data.bookings.map((event: any) => {
      return {
        title: event.title,
        start: dayjs.utc(event.startDateTime).format('YYYY-MM-DDTHH:mm'),
        end: dayjs.utc(event.endDateTime).format('YYYY-MM-DDTHH:mm'),
        extendedProps: {
          bookingId: event.bookingId,
          roomId: event.room_FK,
          description: event.description,
          isRecurring: event.isRecurring,
          recurringId: event.recurringId,
          invitations: event.invitations,
          daysOfWeek: event.daysOfWeek,
        }
      }
    })
    yield put(getAllBookingsSuccess(data));
  } catch (error: any) {
    yield put(setBookingError({ errorMsg: error.response.data?.message || error.response.statusText }));
    yield put(setLoading(false));
  }
}

export function* addOneBooking(action: PayloadAction<OneBooking>) {
  try {
    const response: AxiosResponse = yield call(bookingService.post, { url: 'bookings/one-time', body: action.payload })
    const { title, startDateTime, endDateTime, bookingId, room_FK, description, isRecurring, recurringId, invitations, daysOfWeek } = response.data
    yield put(addBookingSuccess([{
      title,
      start: startDateTime,
      end: endDateTime,
      extendedProps: {
        bookingId,
        description,
        isRecurring,
        recurringId,
        invitations,
        daysOfWeek,
        roomId: room_FK,
      }
    }]));
    yield put(ownBookingsActions.reset());
    yield put(ownBookingsActions.getTotal(1));
    const location = window.location.pathname.toString();
    if (location == "/rooms") {
      yield RoomBookingPopup.Success();
    }
  } catch (error: any) {
    yield put(setBookingError({ errorMsg: error.response.data.message }));
    yield put(setLoading(false));
    const location = window.location.pathname.toString();
    if (location == "/rooms") {
      yield RoomBookingPopup.ErrorPopup(error);
    }
  }
}

export function* addRecurringBooking(action: PayloadAction<AddRecurringBooking>) {
  try {
    const response: AxiosResponse = yield call(bookingService.post, { url: 'bookings/recurring', body: action.payload })
    const getEvents = response.data.map((event: any) => ({
      title: event.title,
      start: event.startDateTime,
      end: event.endDateTime,
      extendedProps: {
        bookingId: event.bookingId,
        roomId: event.room_FK,
        description: event.description,
        isRecurring: event.isRecurring,
        recurringId: event.recurringId,
        invitations: event.invitations,
        daysOfWeek: event.daysOfWeek,
      }
    }))
    yield put(addBookingSuccess(getEvents));
    yield put(ownBookingsActions.reset());
    yield put(ownBookingsActions.getTotal(1));
    const location = window.location.pathname.toString();
    if (location == "/rooms") {
      yield RoomBookingPopup.Success();
    }
  } catch (error: any) {
    yield put(setBookingError({ errorMsg: error.response.data.message }));
    yield put(setLoading(false));
    const location = window.location.pathname.toString();
    if (location == "/rooms") {
      yield RoomBookingPopup.ErrorPopup(error);
    }
  }
}

export function* editOneBooking(action: PayloadAction<OneBooking>) {
  try {
    const response: AxiosResponse = yield call(bookingService.patch, {
      url: "bookings/one-time",
      body: action.payload,
    });
    const { bookingId } = response.data;
    yield put(editOneBookingSuccess(bookingId));
    yield put(ownBookingsActions.reset());
    yield put(ownBookingsActions.getTotal(1));
  } catch (error: any) {
    yield put(setBookingError({ errorMsg: error.response.data.message }));
    yield put(setLoading(false));
  }
}

export function* editRecurringBooking(action: PayloadAction<EditRecurringBooking>) {
  const { recurringId } = action.payload;
  try {
    yield call(bookingService.patch, { url: "bookings/recurring", body: action.payload, });
    if (recurringId) {
      yield put(editRecurringBookingSuccess(recurringId));
    }
    yield put(ownBookingsActions.reset());
    yield put(ownBookingsActions.getTotal(1));
  } catch (error: any) {
    yield put(setBookingError({ errorMsg: error.response.data.message }));
    yield put(setLoading(false));
  }
}

export function* deleteBooking(action: PayloadAction<DeleteBookingInterface>) {
  const { id, isRecurring } = action.payload;
  try {
    yield call(bookingService.delete, { url: `bookings/${isRecurring ? "recurring" : "one-time"}/${id}` });
    yield put(deleteBookingSuccess({ id: id, isRecurring: isRecurring }));
    yield put(ownBookingsActions.reset());
    yield put(ownBookingsActions.getTotal(1));
  } catch (error: any) {
    yield put(setBookingError({ errorMsg: error.response.data.message }));
    yield put(setLoading(false));
  }
}

export default function* BookingSagas() {
  yield takeEvery("booking/getAllBookings", getAllBookings);
  yield takeEvery("booking/addOneBooking", addOneBooking);
  yield takeEvery("booking/addRecurringBooking", addRecurringBooking);
  yield takeEvery("booking/deleteBookingById", deleteBooking);
  yield takeEvery("booking/editOneBooking", editOneBooking);
  yield takeEvery("booking/editRecurringBooking", editRecurringBooking);
}
