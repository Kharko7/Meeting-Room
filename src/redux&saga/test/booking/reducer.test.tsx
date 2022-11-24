import bookingReducer, {
  setRoomId,
  editBooking,
  resetState,
  editOneBooking,
  editRecurringBooking,
  setBookingError,
  setDaysOfWeek,
  setDescription,
  setEnd,
  setFloor,
  setSelectedDate,
  setStart,
  setTitle,
  setLoading,
  setInvite,
  getAllBookings,
  getAllBookingsSuccess,
  addOneBooking,
  addRecurringBooking,
  addBookingSuccess,
  deleteBookingById,
  deleteBookingSuccess,
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
  bookingsSuccsess,
  actionGetAllBookings,
  actionAddOneBooking,
  actionAddRecurringBooking,
  actionDeleteById,
  actionEditOneBooking,
  actionEditRecurringBooking,
  invitations,
} from './reducer.variables'

describe('reducer booking test', () => {
  it('should return the initial state', () => {
    expect(bookingReducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should call action getAllBookings and set Loading true to bookiing reducer', () => {
    expect(bookingReducer(initialState, getAllBookings(actionGetAllBookings))).toEqual(
      { ...initialState, loading: true }
    )
  })

  it('should call action addOneBooking and set Loading true to bookiing reducer', () => {
    expect(bookingReducer(initialState, addOneBooking(actionAddOneBooking))).toEqual(
      { ...initialState, loading: true }
    )
  })
  it('should call action addRecurringBooking and set Loading true to bookiing reducer', () => {
    expect(bookingReducer(initialState, addRecurringBooking(actionAddRecurringBooking))).toEqual(
      { ...initialState, loading: true }
    )
  })
  it('should call action deleteBookingById and set Loading true to bookiing reducer', () => {
    expect(bookingReducer(initialState, deleteBookingById(actionDeleteById))).toEqual(
      { ...initialState, loading: true }
    )
  })
  it('should call action editOneBooking and set Loading true to bookiing reducer', () => {
    expect(bookingReducer(initialState, editOneBooking(actionEditOneBooking))).toEqual(
      { ...initialState, loading: true }
    )
  })
  it('should call action editRecurringBooking and set Loading true to bookiing reducer', () => {
    expect(bookingReducer(initialState, editRecurringBooking(actionEditRecurringBooking))).toEqual(
      { ...initialState, loading: true }
    )
  })

  it('should set all Bookings to bookiing reducer', () => {
    expect(bookingReducer(initialState, getAllBookingsSuccess(bookingsSuccsess))).toEqual(
      { ...initialState, bookings: bookingsSuccsess, loading: false }
    )
  })
  it('should delete booking by Id', () => {
    expect(bookingReducer({ ...initialState, bookings: bookingsSuccsess }, deleteBookingSuccess(actionDeleteById))).toEqual(
      { ...initialState, bookings: [], loading: false }
    )
  })

  it('should set one Bookings to bookiing reducer', () => {
    expect(bookingReducer(initialState, addBookingSuccess(bookingsSuccsess))).toEqual(
      {
        ...initialState,
        bookings: [...initialState.bookings, ...bookingsSuccsess],
        loading: false
      }
    )
  })

  it('should set RoomId to bookiing reducer', () => {
    expect(bookingReducer(initialState, setRoomId(roomId))).toEqual(
      { ...initialState, roomId: roomId }
    )
  })

  it('should set Loading bookiing reducer', () => {
    const loading = true
    expect(bookingReducer(initialState, setLoading(loading))).toEqual(
      { ...initialState, loading: loading }
    )
  })

  it('should set Floor to bookiing reducer', () => {
    expect(bookingReducer(initialState, setFloor('2'))).toEqual(
      { ...initialState, floor: '2' }
    )
  })

  it('should set Description to bookiing reducer', () => {
    expect(bookingReducer(initialState, setDescription(text))).toEqual(
      { ...initialState, description: text }
    )
  })

  it('should set DaysOfWeek to bookiing reducer', () => {
    expect(bookingReducer(initialState, setDaysOfWeek(daysOfWeek))).toEqual(
      { ...initialState, daysOfWeek: daysOfWeek }
    )
  })

  it('should set  Invite ID to bookiing reducer', () => {
    expect(bookingReducer(initialState, setInvite(invitations))).toEqual(
      { ...initialState, invitedId: invitations }
    )
  })

  it('should set errors to bookiing reducer', () => {
    expect(bookingReducer(initialState, setBookingError(error))).toEqual(
      { ...initialState, errors: error }
    )
  })

  it('should set Title to bookiing reducer', () => {
    expect(bookingReducer(initialState, setTitle(text))).toEqual(
      { ...initialState, title: text }
    )
  })

  it('should set Start to bookiing reducer', () => {
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
      invitedId: initialState.invitedId,
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
        floor: bookingEdit.floor,
        description: bookingEdit.description,
        bookingId: bookingEdit.bookingId,
        daysOfWeek: bookingEdit.daysOfWeek,
      }
    )
  })
})
