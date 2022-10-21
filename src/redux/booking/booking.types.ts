import { DateSelectArg } from "@fullcalendar/react";

export enum BookingTypes {
  SET_TITLE = 'SET_TITLE',
  SET_START = 'SET_START',
  SET_END = 'SET_END',
  SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR',
  SET_BORDER_COLOR = 'SET_BORDER_COLOR',
  SET_SELECTED_DATE = 'SET_SELECTED_DATE',
  SET_BOOKING_ERROR = 'SET_BOOKING_ERROR',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE',
}

interface SetTitleAction {
  type: BookingTypes.SET_TITLE;
  payload: string;
}
interface SetStartAction {
  type: BookingTypes.SET_START;
  payload: string | undefined;
}
interface SetEndAction {
  type: BookingTypes.SET_END;
  payload: string | undefined;
}
interface SetBackgrounColorAction {
  type: BookingTypes.SET_BACKGROUND_COLOR;
  payload: string;
}
interface SetSelectedDateAction {
  type: BookingTypes.SET_SELECTED_DATE;
  payload: DateSelectArg;
}
interface SetBookingError {
  type: BookingTypes.SET_BOOKING_ERROR;
  payload: Record<string, string>;
}
interface SetInitialState {
  type: BookingTypes.SET_INITIAL_STATE;
}

export type BookingAction =
  SetTitleAction |
  SetStartAction |
  SetEndAction |
  SetBackgrounColorAction |
  SetSelectedDateAction |
  SetBookingError |
  SetInitialState