import { DateSelectArg, EventApi } from "@fullcalendar/react";

export enum BookingTypes {
  SET_TITLE = 'SET_TITLE',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_START = 'SET_START',
  SET_END = 'SET_END',
  SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR',
  SET_BORDER_COLOR = 'SET_BORDER_COLOR',
  SET_SELECTED_DATE = 'SET_SELECTED_DATE',
  SET_BOOKING_ERROR = 'SET_BOOKING_ERROR',
  STATE_RESET = 'STATE_RESET',
  EDIT_BOOKING = 'EDIT_BOOKING',
}

interface SetTitleAction {
  type: BookingTypes.SET_TITLE;
  payload: string;
}
interface SetDescriptionAction {
  type: BookingTypes.SET_DESCRIPTION;
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
interface EditBooking {
  type: BookingTypes.EDIT_BOOKING;
  payload: EventApi;
}
interface StateReset {
  type: BookingTypes.STATE_RESET;
}

export type BookingAction =
  SetTitleAction |
  SetDescriptionAction |
  SetStartAction |
  SetEndAction |
  SetBackgrounColorAction |
  SetSelectedDateAction |
  SetBookingError |
  StateReset |
  EditBooking