import { BookingTypes } from "./booking.types";
import { DateSelectArg, } from "@fullcalendar/react";

export const setTitle = (payload: string) => ({
  type: BookingTypes.SET_TITLE,
  payload
});
export const setStart = (payload: string | undefined) => ({
  type: BookingTypes.SET_START,
  payload
});
export const setEnd = (payload: string | undefined) => ({
  type: BookingTypes.SET_END,
  payload
});
export const setBackgroundColor = (payload: string) => ({
  type: BookingTypes.SET_BACKGROUND_COLOR,
  payload
});
export const setSelectedDate = (payload: DateSelectArg) => ({
  type: BookingTypes.SET_SELECTED_DATE,
  payload
});
export const setBookingError = (payload: Record<string, string>) => ({
  type: BookingTypes.SET_BOOKING_ERROR,
  payload
});
export const setInitialState = () => ({
  type: BookingTypes.SET_INITIAL_STATE
});