
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { OneBooking, RcurringBooking, BookingEvent, DeleteBookingInterface } from 'interfaces/booking/Booking';
export interface InitialStateBookig {
    title: string;
    start: string;
    end: string;
    loading: boolean;
    roomId: number | null;
    floor: string;
    bookingId: number | null;
    description: string;
    invitedId: number[];
    daysOfWeek: string[];
    errors: Record<string, string>;
    bookings: BookingEvent[];
    isRecurring: boolean;
    recurringId: number | null;

}

const initialState: InitialStateBookig = {
    title: '',
    description: '',
    start: '',
    end: '',
    roomId: null,
    bookingId: null,
    floor: '',
    invitedId: [],
    daysOfWeek: [],
    bookings: [],
    errors: {},
    loading: false,
    isRecurring: false,
    recurringId: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        deleteBookingById(state, action: PayloadAction<DeleteBookingInterface>) {
            state.loading = true;
        },
        editOneBooking(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        editRecurringBooking(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getAllBookings(state, action: PayloadAction<Record<string, string | number>>) {
            state.loading = true;
        },
        getAllBookingsSuccess(state, action: PayloadAction<BookingEvent[]>) {
            state.loading = false;
            state.bookings = action.payload;
        },
        addOneBooking(state, action: PayloadAction<OneBooking>) {
            state.loading = true;
        },
        addOneBookingSuccess(state, action: PayloadAction<BookingEvent[]>) {
            state.loading = false;
            state.bookings = [...state.bookings, ...action.payload];
        },
        addRecurringBooking(state, action: PayloadAction<RcurringBooking>) {
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
        setInvite(state, action: PayloadAction<number[]>) {
            state.invitedId = action.payload;
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
            state.floor = action.payload.floor;
            state.description = action.payload.description;
            state.bookingId = action.payload.bookingId;
            state.isRecurring = action.payload.isRecurring;
            state.recurringId = action.payload.recurringId;
        },
        resetState(state) {
            state.title = initialState.title;
            state.start = initialState.start;
            state.end = initialState.end;
            state.description = initialState.description;
            state.daysOfWeek = initialState.daysOfWeek;
            state.invitedId = initialState.invitedId;
            state.bookingId = initialState.bookingId
            state.recurringId = initialState.recurringId;
            state.errors = initialState.errors;
        },
    },
});
export const {
    setRoomId,
    editBooking,
    resetState,
    editOneBooking,
    editRecurringBooking,
    setBookingError,
    setDaysOfWeek,
    setDescription,
    setEnd,
    setFloor,
    setSelectedDate,
    setStart,
    setTitle,
    setLoading,
    setInvite,
    getAllBookings,
    getAllBookingsSuccess,
    addOneBooking,
    addRecurringBooking,
    addOneBookingSuccess,
    deleteBookingById,
} = bookingSlice.actions;

const bookingReducer = bookingSlice.reducer;

export default bookingReducer;
