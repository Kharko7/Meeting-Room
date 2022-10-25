import { BookingTypes } from "./booking.types";
import { DateSelectArg, EventApi, } from "@fullcalendar/react";

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
export const editBooking = (payload: EventApi) => ({
  type: BookingTypes.EDIT_BOOKING,
  payload
});
export const resetState = () => ({
  type: BookingTypes.STATE_RESET
});