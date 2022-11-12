import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import authReducer from "./slices/auth.slice";
import rootSaga from "./saga/root-saga";
import bookingReducer from './slices/booking.slice';
import ownBookingsReducer from './slices/ownBookings.slice';
import roomsReducer from './slices/rooms.slice';
const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  ownBookings: ownBookingsReducer,
  rooms: roomsReducer,
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