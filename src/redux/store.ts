import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./saga/root-saga";
import bookingReducer from './slices/booking.slice';
import ownBookingsReducer from './slices/ownBookings.slice';
import roomReducer from './slices/room.slice';
import userReducer from './slices/user.slice';

const rootReducer = combineReducers({
  booking: bookingReducer,
  ownBookings: ownBookingsReducer,
  user: userReducer,
  room: roomReducer,
});

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;