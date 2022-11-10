
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AddOneBooking, AddRcurringBooking, BookingEvent } from 'interfaces/booking/Booking';
export interface InitialStateBookig {
    title: string;
    start: string;
    end: string;
    loading: boolean;
    roomId: number | null;
    floor: string | null;
    bookingId?: number;
    description: string;
    invitedIds: number[];
    daysOfWeek: string[];
    errors: Record<string, string>;
    bookings: BookingEvent[];
}

const initialState: InitialStateBookig = {
    title: '',
    description: '',
    start: '',
    end: '',
    roomId: null,
    floor: null,
    invitedIds: [],
    daysOfWeek: [],
    bookings: [],
    errors: {},
    loading: false,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        getAllBookings(state, action: PayloadAction<Record<string, string>>) {
            state.loading = true;
        },
        getAllBookingsSuccess(state, action: PayloadAction<BookingEvent[]>) {
            state.loading = false;
            state.bookings = action.payload;
        },
        addOneBooking(state, action: PayloadAction<AddOneBooking>) {
            state.loading = true;
        },
        addOneBookingSuccess(state, action: PayloadAction<BookingEvent[]>) {
            state.loading = false;
            state.bookings = [...state.bookings, ...action.payload];
        },
        addRecurringBooking(state, action: PayloadAction<AddRcurringBooking>) {
            state.loading = true;
        },
        setRoomId(state, action: PayloadAction<number | null>) {
            state.roomId = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setFloor(state, action: PayloadAction<string>) {
            state.floor = action.payload;
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
        setStart(state, action: PayloadAction<string>) {
            state.start = action.payload;
        },
        setEnd(state, action: PayloadAction<string>) {
            state.end = action.payload;
        },
        setSelectedDate(state, action: PayloadAction<Record<string, string>>) {
            state.start = action.payload.start;
            state.end = action.payload.end;
        },
        setBookingError(state, action: PayloadAction<Record<string, string>>) {
            state.errors = { ...state.errors, ...action.payload };
        },
        setDaysOfWeek(state, action: PayloadAction<string[]>) {
            state.daysOfWeek = action.payload;
        },
        editBooking(state, action: PayloadAction<any>) {
            state.title = action.payload.title;
            state.start = action.payload.start;
            state.end = action.payload.end;
            state.roomId = action.payload.roomId;
            state.description = action.payload.description;
            state.bookingId = action.payload.bookingId;
        },
        resetState(state) {
            state.title = initialState.title;
            state.start = initialState.start;
            state.end = initialState.end;
            state.description = initialState.description;
            state.daysOfWeek = initialState.daysOfWeek;
            state.invitedIds = initialState.invitedIds;
            state.errors = initialState.errors;
        },
    },
});
export const {
    setRoomId,
    editBooking,
    resetState,
    setBookingError,
    setDaysOfWeek,
    setDescription,
    setEnd,
    setFloor,
    setSelectedDate,
    setStart,
    setTitle,
    setLoading,
    getAllBookings,
    getAllBookingsSuccess,
    addOneBooking,
    addRecurringBooking,
    addOneBookingSuccess,
} = bookingSlice.actions;

const bookingReducer = bookingSlice.reducer;

export default bookingReducer;
