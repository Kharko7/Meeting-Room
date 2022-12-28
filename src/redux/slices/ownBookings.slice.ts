import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import {
  Booking,
  BookingResponse,
  GetOwnBookingsPayload,
  GetOwnBookingsSuccessPayload
} from "interfaces/OwnBookings";


export interface InitialStateBooking {
  bookings: Booking[]
  totalCount: number;
  loading: boolean;
  limit: number;
  page: number;
  notification: string;
  refreshOwnBookings: boolean;
}

const initialState: InitialStateBooking = {
  bookings: [],
  totalCount: 0,
  loading: false,
  limit: 0,
  page: 2,
  notification: '',
  refreshOwnBookings: false,
};

const ownBookingsSlice = createSlice({
  name: "ownBookings",
  initialState,
  reducers: {
    getOwnBookings(state, action: PayloadAction<GetOwnBookingsPayload>) {
      state.loading = false
    },
    getOwnBookingsSuccess(state, action: PayloadAction<GetOwnBookingsSuccessPayload>) {
      state.bookings = [...state.bookings, ...action.payload.bookings]
      state.totalCount = action.payload.totalCount
      state.loading = false
    },
    getOwnBookingsError(state, action: PayloadAction<string>) {
      state.notification = action.payload;
      state.loading = false;
    },
    setOwnEditBookigs(state, action: PayloadAction<BookingResponse>) {
      const newBookings: Booking[] = state.bookings.length ? state.bookings.map((booking: Booking) => {
        if (booking.bookingId === action.payload.bookingId) {
          return {
            title: action.payload.title,
            start: dayjs.utc(action.payload.startDateTime).format('YYYY-MM-DDTHH:mm'),
            end: dayjs.utc(action.payload.endDateTime).format('YYYY-MM-DDTHH:mm'),
            bookingId: action.payload.bookingId,
            roomId: action.payload.room_FK,
            description: action.payload.description,
            isRecurring: action.payload.isRecurring,
            invitations: [],
            daysOfWeek: action.payload.daysOfWeek,
            creatorId: action.payload.creatorId_FK,
            recurringId: 0,
          }
        } else return booking
      }) : []
      state.bookings = newBookings
    },
    setOwnAddBookigs(state) {
      state.refreshOwnBookings = !state.refreshOwnBookings
    },
    deleteOwnBooking(state, action: PayloadAction<number>) {
      const newBookings = state.bookings.filter((booking) => {
        return booking.bookingId !== action.payload
      })
      state.bookings = newBookings
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    resetState(state) {
      state.bookings = initialState.bookings
      state.page = initialState.page
    },

  },
});

export const {
  getOwnBookings,
  getOwnBookingsSuccess,
  getOwnBookingsError,
  setOwnEditBookigs,
  setOwnAddBookigs,
  deleteOwnBooking,
  setPage,
  resetState,

} = ownBookingsSlice.actions;

const ownBookingsReducer = ownBookingsSlice.reducer;

export default ownBookingsReducer;
