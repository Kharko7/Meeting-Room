import { createSlice } from "@reduxjs/toolkit";
interface devices {
  deviceId: number;
  name: string;
}
export interface Rooms {
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
  roomSoonestBookingsDays: any;
  roomsByFloor: Array<Array<Rooms>>;
  statuses: object;
  rooms: Array<Rooms>;
  timeStatusUdated: number;
  statusUpdatedCounter: number;
  location: string;
}

const initialState: InitialStateRooms = {
  filter: "all",
  floors: [],
  rooms: [],
  roomSoonestBookingsDays: [],
  roomsByFloor: [],
  statuses: {},
  timeStatusUdated: 0,
  statusUpdatedCounter: 0,
  location:  window.location.pathname.toString(),
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getRooms() {},
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    setFilters(state, action) {
      state.filter = action.payload;
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
    getRoomsStatus(state, { payload }) {},
    setRoomsStatus(state, { payload }) {
      //@ts-ignore
      state.statuses = payload;
    },
    setTimeStatusUdated(state, action) {
      state.timeStatusUdated = action.payload;
    },
    setStatusUpdatedCounter(state) {
      state.statusUpdatedCounter = state.statusUpdatedCounter + 1;
    },
    resetState() {
      return { ...initialState };
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});
export const roomsActions = roomsSlice.actions;

const roomsReducer = roomsSlice.reducer;

export default roomsReducer;
