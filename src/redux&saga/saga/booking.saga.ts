import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { addOneBookingSuccess, getAllBookingsSuccess, setBookingError, setLoading } from 'redux&saga/slices/booking.slice';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { DeleteBookingInterface, OneBooking, RcurringBooking } from 'interfaces/booking/Booking';
import { bookingService } from 'services/booking.service/booking.service';

dayjs.extend(utc)

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
                }
            }
        })
        console.log(response)
        yield put(getAllBookingsSuccess(data));
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data?.message || error.response.statusText }));
        yield put(setLoading(false));
    }
}

export function* addOneBooking(action: PayloadAction<OneBooking>) {

    try {
        const response: AxiosResponse = yield call(bookingService.post, { url: 'bookings/one-time', body: action.payload })
        // yield put(addOneBookingSuccess([{
        //     title: response.data.title,
        //     start: response.data.startDateTime,
        //     end: response.data.endDateTime,
        //     extendedProps: {
        //         bookingId: response.data.bookingId,
        //         roomId: response.data.room_FK,
        //         description: response.data.description,
        //     }
        // }]));
        console.log(response)
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}

export function* addRecurringBooking(action: PayloadAction<RcurringBooking>) {
    try {
        const response: AxiosResponse = yield call(bookingService.post, { url: 'bookings/recurring', body: action.payload })
        console.log(response)
        // const getEvents = response.data.map((event: any) => ({
        //     title: event.title,
        //     start: event.startDateTime,
        //     end: event.endDateTime,
        //     extendedProps: {
        //         bookingId: event.bookingId,
        //         roomId: event.room_FK,
        //         description: event.description,
        //     }
        // }))
        //yield put(addOneBookingSuccess(getEvents));
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}

export function* editOneBooking(action: PayloadAction<OneBooking>) {
    try {
        const response: AxiosResponse = yield call(bookingService.patch, { url: 'bookings/one-time', body: action.payload })
        yield put(setLoading(false));
        console.log(response)
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}

export function* editRecurringBooking(action: PayloadAction<RcurringBooking>) {
    try {
        const response: AxiosResponse = yield call(bookingService.patch, { url: 'bookings/recurring', body: action.payload })
        yield put(setLoading(false));
        console.log(response)
    } catch (error: any) {
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}

export function* deleteBooking(action: PayloadAction<DeleteBookingInterface>) {
    const { id, isRecurring } = action.payload
    console.log(action.payload)
    try {
        const response: AxiosResponse = yield call(bookingService.delete, { url: `bookings/${isRecurring ? 'recurring' : 'one-time'}/${id}` })
        yield put(setLoading(false));
        console.log(response)
    } catch (error: any) {
        console.log(error)
        yield put(setBookingError({ errorMsg: error.response.data.message }));
        yield put(setLoading(false));
    }
}

export default function* BookingSagas() {
    yield takeEvery('booking/getAllBookings', getAllBookings);
    yield takeEvery('booking/addOneBooking', addOneBooking);
    yield takeEvery('booking/addRecurringBooking', addRecurringBooking);
    yield takeEvery('booking/deleteBookingById', deleteBooking);
    yield takeEvery('booking/editOneBooking', editOneBooking);
    yield takeEvery('booking/editRecurringBooking', editRecurringBooking);
}