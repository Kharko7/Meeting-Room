import { call, put, fork, takeLatest } from "redux-saga/effects";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { AxiosResponse } from "axios";

import { RoomsService } from "services/room.service/rooms.service";
function* workerRooms() {
  try {
    const dataRooms: AxiosResponse = yield call(RoomsService.getRooms);
    // console.log(dataRooms.data, "saga rooms");
    yield put(roomsActions.setRooms(dataRooms.data));
  } catch (error) {
    console.log(error);
  }
}
export default function* watchRooms() {
  yield takeLatest("rooms/getRooms", workerRooms);
}

export function* roomsSaga() {
  yield fork(watchRooms);
}
