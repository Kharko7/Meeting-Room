import {
  call,
  put,
  all,
  take,
  select,
  fork,
  takeLatest,
} from "redux-saga/effects";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { AxiosResponse } from "axios";
import moment, { now } from "moment";
import { ResponsePopup } from "pages/rooms/PopupStatus";
import { PayloadAction } from "@reduxjs/toolkit";
import { RoomsService } from "services/room.service/rooms.service";
import { useAppSelector } from "hooks/toolkitHooks";
import { NavLink, useLocation } from "react-router-dom";
function* workerStatus(arr: any) {
  const { timeStatusUdated, rooms, statusUpdatedCounter } = yield select(
    (state) => state.rooms
  );

  const time = Date.now();
  const bool =
    statusUpdatedCounter == 1 ? true : timeStatusUdated + 60000 >= time;
  try {
    if (rooms.length > 0 && bool) {
      const dataRoomsStatus1: AxiosResponse = yield call(
        RoomsService.getRoomsStatus1
      );
      const dataRoomsStatus2: AxiosResponse = yield call(
        RoomsService.getRoomsStatus2
      );
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
      yield put(roomsActions.setRoomsStatus(date));
      const location = window.location.pathname.toString();
      if (location == "/rooms" && statusUpdatedCounter == 1) {
        yield ResponsePopup.Success();
      }
    } else {
      // const location = window.location.pathname.toString();
      // if (location == "/rooms") {
      //   yield ResponsePopup.Wait();
      // }
    }
  } catch (error: any) {
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
    const dataRooms: AxiosResponse = yield call(RoomsService.getRooms);
    const floors = Object.keys(dataRooms.data).length;
    const arrFloors = Array.from({ length: floors }, (_, i) => i + 1);

    const arr = Object.values(dataRooms.data).reduce((array: any, c: any) => {
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
    yield put(roomsActions.setSoonestBookingsDays(data.data));
  } catch (error) {
    console.log(error);
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
