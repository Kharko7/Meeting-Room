import { call, put, all, take, fork, takeLatest } from "redux-saga/effects";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { AxiosResponse } from "axios";
import moment, { now } from "moment";

import { PayloadAction } from "@reduxjs/toolkit";
import { RoomsService } from "services/room.service/rooms.service";
import { useAppSelector } from "hooks/toolkitHooks";
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
  } catch (error) {
    console.log(error);
  }
}

function* workerStatus(arr: any) {
  try {
    const dataRoomsStatus1: AxiosResponse = yield call(
      RoomsService.getRoomsStatus1
    );
    const dataRoomsStatus2: AxiosResponse = yield call(
      RoomsService.getRoomsStatus2
    );
    console.log(arr.payload, "payload");
    const date = arr.payload.reduce((p: any, c: any) => {
      const name = c.roomId;
      //@ts-ignore
      p[name] = false;
      return p;
    }, {});

    const dataRoomsStatus = [
      ...dataRoomsStatus1.data,
      ...dataRoomsStatus2.data,
    ];
    dataRoomsStatus.map((room: any) => {
      room.bookings.map((booking: any) => {
        const a = moment(now());
        const b = moment(booking.startDateTime);
        const x = moment(booking.endDateTime);
        const trues = a.isBetween(b, x);
        if (trues) date[room.roomId] = true;
      });
    });
    console.log(date, "statuses saga");
     yield put(roomsActions.setRoomsStatus(date));
  } catch (error) {
    console.log(error);
  }
}
export function* watchRoomsStatus() {
  while (true) {
    const action: PayloadAction = yield take(roomsActions.getRoomsStatus.type);
    yield fork(workerStatus, action);
  }
}
function* workerRooms() {
  try {
    console.log("start");
    const dataRooms: AxiosResponse = yield call(RoomsService.getRooms);
    console.log(dataRooms.data);
    const floors = Object.keys(dataRooms.data).length;
    const arrFloors = Array.from({ length: floors }, (_, i) => i + 1);

    const arr = Object.values(dataRooms.data).reduce((array: any, c: any) => {
      console.log(array, c, "array c");
      array = [...array, ...c];
      return array;
    });
    yield put(roomsActions.setRooms(arr));

    yield put(roomsActions.setCountOfFloors(arrFloors));
    yield put(roomsActions.setRoomsByFloor(Object.values(dataRooms.data)));
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
  yield all([
    fork(watchRooms),
    fork(watchSoonestBookingsDays),
    fork(watchRoomsStatus),
  ]);
}
