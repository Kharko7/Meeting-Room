import { createSlice } from "@reduxjs/toolkit";
interface devices {
  deviceId: number;
  name: string;
}
interface rooms {
  roomId: number;
  name: string;
  floor: number;
  capacity: number;
  office_FK: number;
  devices: Array<devices>;
}
export interface InitialStateRooms {
  rooms: Array<rooms> | [];
  roomSoonestBookingsDays:any;
}

const initialState: InitialStateRooms = {
  rooms: [],
  roomSoonestBookingsDays:[]
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getRooms() {},
    setRooms(state, action) {
      // console.log(action.payload);
      state.rooms = action.payload;
    },
    getSoonestBookingsDays() {},
    setSoonestBookingsDays(state, action) {

    },

    resetState() {
      return { ...initialState };
    },
  },
});
export const roomsActions = roomsSlice.actions;

const roomsReducer = roomsSlice.reducer;

export default roomsReducer;
