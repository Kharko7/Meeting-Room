import bookingReducer, {
  setRoomId,
  editBooking,
  resetState,
  setBookingError,
  setDaysOfWeek,
  setDescription,
  setEnd,
  setFloor,
  setSelectedDate,
  setStart,
  setTitle,
} from 'redux&saga/slices/booking.slice'
import {
  initialState,
  roomId,
  text,
  daysOfWeek,
  error,
  dateStart,
  dateEnd,
  state,
  bookingEdit,
} from './reducer.variables'

describe('reducer booking test', () => {
  it('should return the initial state', () => {
    expect(bookingReducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should set roomId to bookiing reducer', () => {
    expect(bookingReducer(initialState, setRoomId(roomId))).toEqual(
      { ...initialState, roomId: roomId }
    )
  })

  it('should set floor to bookiing reducer', () => {
    expect(bookingReducer(initialState, setFloor('2'))).toEqual(
      { ...initialState, floor: '2' }
    )
  })

  it('should set description to bookiing reducer', () => {
    expect(bookingReducer(initialState, setDescription(text))).toEqual(
      { ...initialState, description: text }
    )
  })

  it('should set daysOfWeek to bookiing reducer', () => {
    expect(bookingReducer(initialState, setDaysOfWeek(daysOfWeek))).toEqual(
      { ...initialState, daysOfWeek: daysOfWeek }
    )
  })

  it('should set errors to bookiing reducer', () => {
    expect(bookingReducer(initialState, setBookingError(error))).toEqual(
      { ...initialState, errors: error }
    )
  })

  it('should set title to bookiing reducer', () => {
    expect(bookingReducer(initialState, setTitle(text))).toEqual(
      { ...initialState, title: text }
    )
  })

  it('should set start to bookiing reducer', () => {
    expect(bookingReducer(initialState, setStart(dateStart))).toEqual(
      { ...initialState, start: dateStart }
    )
  })

  it('should set end to bookiing reducer', () => {
    expect(bookingReducer(initialState, setEnd(dateEnd))).toEqual(
      { ...initialState, end: dateEnd }
    )
  })

  it('should set selected date to bookiing reducer', () => {
    expect(bookingReducer(initialState, setSelectedDate({ start: dateStart, end: dateEnd, }))).toEqual(
      {
        ...initialState,
        start: dateStart,
        end: dateEnd,
      }
    )
  })

  it('should reset State', () => {
    expect(bookingReducer(state, resetState())).toEqual({
      ...state,
      title: initialState.title,
      start: initialState.start,
      end: initialState.end,
      description: initialState.description,
      daysOfWeek: initialState.daysOfWeek,
      invitedIds: initialState.invitedIds,
      errors: initialState.errors,
    })
  })

  it('should edit Booking', () => {
    expect(bookingReducer(state, editBooking(bookingEdit))).toEqual(
      {
        ...state,
        title: bookingEdit.title,
        start: bookingEdit.start,
        end: bookingEdit.end,
        roomId: bookingEdit.roomId,
        description: bookingEdit.description,
        bookingId: bookingEdit.bookingId,
      }
    )
  })
})
