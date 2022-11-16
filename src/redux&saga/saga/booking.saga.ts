import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { addOneBookingSuccess, getAllBookingsSuccess, setBookingError, setLoading } from 'redux&saga/slices/booking.slice';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { AddOneBooking, AddRcurringBooking } from 'interfaces/booking/Booking';
import { bookingService } from 'services/booking.service/booking.service';

dayjs.extend(utc)

export function* getAllBookings(action: PayloadAction<Record<string, string>>) {
    const { startDate, endDate } = action.payload
    try {
        const response: AxiosResponse = yield call(bookingService.get, { url: `bookings?roomId=1&startDate=${startDate}&endDate=${endDate}` })
        const data = response.data.bookings.map((event: any) => {
            return {
                title: event.title,
                start: dayjs.utc(event.startDateTime).format('YYYY-MM-DDTHH:mm'),
                end: dayjs.utc(event.endDateTime).format('YYYY-MM-DDTHH:mm'),
                extendedProps: {
                    bookingId: event.bookingId,
                    roomId: event.room_FK,
                    description: event.description,
                }
            }
        })
        yield put(getAllBookingsSuccess(data));
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data?.message || error.response.statusText }));
        yield put(setLoading(false));
    }
}

export function* addOneBooking(action: PayloadAction<AddOneBooking>) {
    try {
        const response: AxiosResponse = yield call(bookingService.post, { url: 'bookings/one-time', body: action.payload })
        yield put(addOneBookingSuccess([{
            title: response.data.title,
            start: response.data.startDateTime,
            end: response.data.endDateTime,
            extendedProps: {
                bookingId: response.data.bookingId,
                roomId: response.data.room_FK,
                description: response.data.description,
            }
        }]));
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}
export function* addRecurringBooking(action: PayloadAction<AddRcurringBooking>) {
    try {
        const response: AxiosResponse = yield call(bookingService.post, { url: 'bookings/recurring', body: action.payload })
        console.log(response)
        const getEvents = response.data.map((event: any) => ({
            title: event.title,
            start: event.startDateTime,
            end: event.endDateTime,
            extendedProps: {
                bookingId: event.bookingId,
                roomId: event.room_FK,
                description: event.description,
            }
        }))
        yield put(addOneBookingSuccess(getEvents));
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}

// export function* deleteBooking(action: PayloadAction<number>) {
//     try {
//         const response: AxiosResponse = yield call(bookingService.delete, { url: `bookings/one-time/${action.payload}` })
//         console.log(response)
//     } catch (error: any) {
//         console.log(error)
//         yield put(setBookingError({ errorMsg: error.response.data.message }));
//         yield put(setLoading(false));
//     }
// }

export default function* BookingSagas() {
    yield takeEvery('booking/getAllBookings', getAllBookings);
    yield takeEvery('booking/addOneBooking', addOneBooking);
    yield takeEvery('booking/addRecurringBooking', addRecurringBooking);
    //  yield takeEvery('booking/deleteBookingById', deleteBooking);
}