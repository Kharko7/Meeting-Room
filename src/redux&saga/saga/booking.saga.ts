import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosService } from 'services/axios.service/axios.service';
import { addOneBookingSuccess, getAllBookingsSuccess, setBookingError, setLoading } from 'redux&saga/slices/booking.slice';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { AddOneBooking, AddRcurringBooking } from 'interfaces/booking/Booking';

dayjs.extend(utc)

export function* getAllBookings(action: PayloadAction<Record<string, string>>) {
    const { startDate, endDate } = action.payload
    try {
        const response: AxiosResponse = yield call(() => axiosService.get(`bookings?roomId=1&startDate=${startDate}&endDate=${endDate}`))
        const data = response.data.bookings.map((item: any) => {
            return {
                title: item.title,
                start: dayjs.utc(item.startDateTime).format('YYYY-MM-DDTHH:mm'),
                end: dayjs.utc(item.endDateTime).format('YYYY-MM-DDTHH:mm'),
                extendedProps: {
                    bookingId: item.bookingId,
                    roomId: item.room_FK,
                    description: item.description,
                }
            }
        })
        yield put(getAllBookingsSuccess(data));
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            yield put(setBookingError({ errorMsg: error.response.statusText }));
        } else {
            yield put(setBookingError({ errorMsg: error.response.data.message }));
        }
        yield put(setLoading(false));
    }
}

function* addOneBooking(action: PayloadAction<AddOneBooking>) {
    try {
        const response: AxiosResponse = yield call(() => axiosService.post("bookings/one-time", action.payload))
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
        if (error.response.status === 404) {
            yield put(setBookingError({ errorMsg: error.response.statusText }));
        } else {
            yield put(setBookingError({ errorMsg: error.response.data.message }));
        }
        yield put(setLoading(false));
    }
}
function* addRecurringBooking(action: PayloadAction<AddRcurringBooking>) {
    try {
        const response: AxiosResponse = yield call(() => axiosService.post("bookings/recurring", action.payload))
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
        if (error.response.status === 404) {
            yield put(setBookingError({ errorMsg: error.response.statusText }));
        } else {
            yield put(setBookingError({ errorMsg: error.response.data.message }));
        }
        yield put(setLoading(false));
    }
}

export default function* BookingSagas() {
    yield takeEvery('booking/getAllBookings', getAllBookings);
    yield takeEvery('booking/addOneBooking', addOneBooking);
    yield takeEvery('booking/addRecurringBooking', addRecurringBooking);
}