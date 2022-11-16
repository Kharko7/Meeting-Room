import { call, put, all, take, fork, takeLatest } from "redux-saga/effects";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { RoomsService } from "services/room.service/rooms.service";
function* workerFloors(data: any) {
  try {
    console.log(data, "dataWorkerFloors");
    const floors = data[0].office.floors;
    const arrFloors = Array.from({ length: floors }, (_, i) => i + 1);
    yield put(roomsActions.setCountOfFloors(arrFloors));
    const arr: any = [];
    arrFloors.map((index) => {
      arr[index - 1] = [];
    });
    data.map((room: any) => {
      arr[room.floor - 1].push(room);
    });
    yield put(roomsActions.setRoomsByFloor(arr));
    // yield put(roomsActions.setFloor({ floor: 1, room: data[0] }));
  } catch (error) {
    console.log(error);
  }
}
function* workerRooms() {
  try {
    const dataRooms: AxiosResponse = yield call(RoomsService.getRooms);
    // console.log(dataRooms.data, "saga rooms");
    yield fork(workerFloors, dataRooms.data);
    yield put(roomsActions.setRooms(dataRooms.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchRooms() {
  yield all([takeLatest("rooms/getRooms", workerRooms)]);
}

function* workerSoonestBookingsDays(a: any) {
  try {
    const data: AxiosResponse = yield call(
      RoomsService.getSoonestBookingsDays,
      a.payload
    );
    console.log(data.data);
    yield put(roomsActions.setSoonestBookingsDays(data.data));
  } catch (error) {
    console.log(error, "eroorrr");
  }
}
function* watchSoonestBookingsDays() {
  while (true) {
    const action: PayloadAction = yield take(
      roomsActions.getSoonestBookingsDays.type
    );
    yield fork(workerSoonestBookingsDays, action);
  }
}
export function* roomsSaga() {
  yield all([fork(watchRooms), fork(watchSoonestBookingsDays)]);
}
