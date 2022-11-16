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
  filter: null | string;
  floors: Array<number>;
  rooms: Array<rooms> | [];
  roomSoonestBookingsDays: any;
  roomsByFloor: Array<Array<rooms>>;
}

const initialState: InitialStateRooms = {
  filter: "all",
  floors: [],
  rooms: [],
  roomSoonestBookingsDays: [],
  roomsByFloor: [],
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getRooms() {},
    setFilters(state,action){
      state.filter = action.payload;
    },
    setRooms(state, action) {
      // console.log(action.payload);
      state.rooms = action.payload;
    },
    getSoonestBookingsDays(state, action) {},
    setSoonestBookingsDays(state, action) {
      state.roomSoonestBookingsDays = action.payload;
    },
    setCountOfFloors(state, action) {
      state.floors = action.payload;
    },
    setRoomsByFloor(state, action) {
      state.roomsByFloor = action.payload;
    },
    resetState() {
      return { ...initialState };
    },
  },
});
export const roomsActions = roomsSlice.actions;

const roomsReducer = roomsSlice.reducer;

export default roomsReducer;
