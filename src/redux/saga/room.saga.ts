import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { roomService } from "services/room.service";
import { getRoomsSuccess } from "redux/slices/room.slice";
import { Rooms } from "interfaces/Rooms";


function* workerGetRooms() {
  try {
    const response: AxiosResponse = yield call(roomService.getRooms)
    const { data }: { data: Record<string, Rooms[]> } = response
    //let rooms: Rooms[] = []
    console.log(data)

    const floors = Object.keys(data).map((floor) => Number(floor))
   //Object.values(data).forEach((roomsArray) => rooms.push(...roomsArray))

    yield put(getRoomsSuccess({ floors: floors, rooms: data }))

  } catch (error: any) {
    console.log(error)
    //yield put(getOwnBookingsError(error.response.data?.message || error.response.statusText));
  }
}



export default function* RoomSaga() {
  yield takeEvery("room/getRooms", workerGetRooms);
}
