import { BookingTypes, BookingAction } from "./booking.types";
import { EventInput } from '@fullcalendar/react'

const initialState: EventInput = {
  id: '',
  title: '',
  start: '',
  end: '',
  backgroundColor: '',
  borderColor: '',
  errors: {},
}

const bookingReducer = (state = initialState, action: BookingAction): EventInput => {
  switch (action.type) {
    case BookingTypes.SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case BookingTypes.SET_START:
      return {
        ...state,
        start: action.payload
      };
    case BookingTypes.SET_END:
      return {
        ...state,
        end: action.payload
      };
    case BookingTypes.SET_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.payload,
        borderColor: action.payload,
      };
    case BookingTypes.SET_SELECTED_DATE:
      return {
        ...state,
        start: action.payload.startStr,
        end: action.payload.endStr,
      };
    case BookingTypes.SET_BOOKING_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    case BookingTypes.EDIT_BOOKING:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        start: action.payload.startStr,
        end: action.payload.endStr,
        backgroundColor: action.payload.backgroundColor,
        borderColor: action.payload.borderColor,
      };
    case BookingTypes.STATE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default bookingReducer;