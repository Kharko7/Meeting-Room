import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga/root-saga";
import bookingReducer from './slices/booking.slice';
import ownBookingsReducer from './slices/ownBookings.slice';
import roomsReducer from './slices/rooms.slice';
import userReducer from './slices/user.slice';

const rootReducer = combineReducers({
  booking: bookingReducer,
  ownBookings: ownBookingsReducer,
  rooms: roomsReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
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