import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { roomService } from "services/room.service";
import { getRoomsError, getRoomsSuccess } from "redux/slices/room.slice";
import { Rooms } from "interfaces/Rooms";


function* workerGetRooms() {
  try {
    const response: AxiosResponse = yield call(roomService.getRooms)
    const { data }: { data: Record<string, Rooms[]> } = response

    const floors = Object.keys(data).map((floor) => Number(floor))

    yield put(getRoomsSuccess({ floors: floors, rooms: data }))

  } catch (error: any) {
    yield put(getRoomsError(error.response.data?.message || error.response.statusText));
  }
}



export default function* RoomSaga() {
  yield takeEvery("room/getRooms", workerGetRooms);
}
