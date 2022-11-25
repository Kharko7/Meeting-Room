import { createSlice } from "@reduxjs/toolkit";
interface booking {
  bookingId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isRecurring: boolean;
  creatorId_FK: number;
  room_FK: number;
  invitations:Array<number>;
}
export interface InitialStateBooking {
  bookings: Array<booking> | [];
  totalCount: number;
  limit: number;
  page:number;
}

const initialState: InitialStateBooking = {
  bookings: [],
  totalCount: 0,
  limit:0,
  page:1,

};

const ownBookingsSlice = createSlice({
  name: "ownBookings",
  initialState,
  reducers: {
    getOwnBookings(state, { payload }) {},
    setOwnBookings(state, { payload }) {
      state.bookings = state.bookings.concat(payload);
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    getTotal(state, { payload }) {},
    setTotal(state, { payload }) {
      state.totalCount = payload.totalCount;
      state.limit = payload.limit;
    },
    reset(state) {
      state.totalCount = 0;
      state.bookings = [];
      state.limit = 0;
      state.page = 1;
    },
  },
});
export const ownBookingsActions = ownBookingsSlice.actions;

const ownBookingsReducer = ownBookingsSlice.reducer;

export default ownBookingsReducer;
