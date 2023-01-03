import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rooms, RoomsSuccessPayload } from "interfaces/Rooms";


export interface InitialStateBooking {
  rooms: Record<string, Rooms[]>;
  floors: number[];
  loading: boolean;
  notification: string;
}

const initialState: InitialStateBooking = {
  rooms: {},
  floors: [],
  loading: false,
  notification: '',
};


const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRooms(state,) {
      state.loading = true
    },
    getRoomsSuccess(state, action: PayloadAction<RoomsSuccessPayload>) {
      console.log(action.payload)
      state.rooms = action.payload.rooms
      state.floors = action.payload.floors
      state.loading = false
    },
    getRoomsError(state, action: PayloadAction<string>) {
      state.notification = action.payload;
      state.loading = false;
    },
    setNotification(state, action: PayloadAction<string>) {
      state.notification = action.payload;
    }
  },
});

export const {
  getRooms,
  getRoomsSuccess,
  getRoomsError,
  setNotification

} = roomSlice.actions;

const roomReducer = roomSlice.reducer;

export default roomReducer;
