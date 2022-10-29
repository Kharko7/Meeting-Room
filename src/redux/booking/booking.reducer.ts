import { BookingTypes, BookingAction } from "./booking.types";
import { EventInput } from '@fullcalendar/react'

export interface InitialStateBookig {
  //duration: any
  //roomId: number;
  bookingId?: number | null;
  title: string,
  description: string,
  start: string | undefined,
  end: string | undefined,
  backgroundColor: string,
  borderColor: string,
  errors: Record<string, string>,
}

const initialState: InitialStateBookig = {
  //duration: any
  //roomId: number;
  bookingId: null,
  title: '',
  description: '',
  start: '',
  end: '',
  backgroundColor: '',
  borderColor: '',
  errors: {},
}



//                   /rooms?officeId=1234&days=7

// room: {
//   soonestBokings: [

//   ]
// }
//        /bookings?roomId=123143&officeId=1234&startDate=2022:10:12&enddDate
const bookingReducer = (state = initialState, action: BookingAction): InitialStateBookig => {
  console.log(state)
  switch (action.type) {
    case BookingTypes.SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case BookingTypes.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload
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
        bookingId: action.payload.extendedProps.bookingId,
        title: action.payload.title,
        description: action.payload.extendedProps.description,
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