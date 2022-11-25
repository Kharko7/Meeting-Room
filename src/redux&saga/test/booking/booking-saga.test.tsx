import { getAllBookings, addOneBooking, addRecurringBooking, deleteBooking, editOneBooking, editRecurringBooking } from 'redux&saga/saga/booking.saga';
import { call, put } from 'redux-saga/effects';
import { addBookingSuccess, deleteBookingSuccess, editOneBookingSuccess, editRecurringBookingSuccess, getAllBookingsSuccess, setBookingError } from 'redux&saga/slices/booking.slice';
import { bookingService } from 'services/booking.service/booking.service';
import { actionAddOneBooking, actionAddRecurringBooking, actionEditOneBooking, actionEditRecurringBooking, actionGetAllBookings, bookingsSuccsess, urlGetAllBookings } from './reducer.variables';

let saga: any;

describe('saga getAllBookings test', () => {
  const action = { payload: actionGetAllBookings, type: 'booking/getAllBookings' };
  const response = {
    data: {
      bookings: [{
        title: "First meeting",
        startDateTime: "2022-11-12T12:00",
        endDateTime: "2022-11-12T14:00",
        bookingId: 1,
        room_FK: 1,
        description: "First meeting 01",
        isRecurring: false,
        recurringId: null,
        invitations: [],
        daysOfWeek: null,
      }]
    }
  }

  it('getAllBookings success', () => {
    saga = getAllBookings(action);

    expect(saga.next().value).toEqual(call(bookingService.get, { url: urlGetAllBookings }));
    expect(saga.next(response).value).toEqual(
      put(getAllBookingsSuccess(bookingsSuccsess))
    )
    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga getAllBookings error 500 test', () => {
  const action = { payload: { startDate: '2022-10-12T00:00', endDate: '' }, type: 'booking/getAllBookings' };
  const error = {
    response: {
      data: {
        message: "Internal server error",
        statusCode: 500,
      },
    }
  }

  it('getAllBookings error 500', () => {
    saga = getAllBookings(action);

    expect(saga.next().value).not.toEqual(call(bookingService.get, { url: urlGetAllBookings }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.data.message }))
    )

    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga getAllBookings error 404 test', () => {
  const action = { payload: actionGetAllBookings, type: 'booking/getAllBookings' };
  const error = {
    response: {
      status: 404,
      statusText: "Not Found"
    }
  }
  const url = '1' + urlGetAllBookings
  it('getAllBookings error 404', () => {
    saga = getAllBookings(action);

    expect(saga.next().value).not.toEqual(call(bookingService.get, { url: url }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.statusText }))
    )

    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga addOneBooking test', () => {
  const action = {
    payload: actionAddOneBooking,
    type: 'booking/addOneBooking'
  }
  const response = {
    data: {
      title: 'Event 2',
      description: 'My event',
      startDateTime: '2022-11-12T08:00',
      endDateTime: '2022-11-12T10:00',
      bookingId: 12,
      room_FK: 1,
      isRecurring: false,
      recurringId: null,
      invitations: [],
      daysOfWeek: null,
    }
  }
  const succsess = [{
    title: response.data.title,
    start: response.data.startDateTime,
    end: response.data.endDateTime,
    extendedProps: {
      bookingId: response.data.bookingId,
      roomId: response.data.room_FK,
      description: response.data.description,
      isRecurring: response.data.isRecurring,
      recurringId: response.data.recurringId,
      invitations: response.data.invitations,
      daysOfWeek: response.data.daysOfWeek,
    }
  }]

  it('saga addOneBooking success', () => {
    saga = addOneBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.post, { url: 'bookings/one-time', body: action.payload }));
    expect(saga.next(response).value).toEqual(
      put(addBookingSuccess(succsess))
    )
    saga.next()
    saga.next()
    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga addOneBooking error 400 test', () => {
  const error = {
    response: {
      data: {
        message: "Meeting with this title already exists",
        statusCode: 400,
      },
    }
  }
  const action = {
    payload: actionAddOneBooking,
    type: 'booking/addOneBooking'
  }

  it('addOneBooking error 400', () => {
    saga = addOneBooking(action);

    expect(saga.next().value).toEqual(call(bookingService.post, { url: 'bookings/one-time', body: action.payload }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.data.message }))
    )

    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga addRecurringBooking test', () => {
  const action = {
    payload: actionAddRecurringBooking,
    type: 'booking/addRecurringBooking'
  }
  const response = {
    data: [{
      title: action.payload.title,
      description: action.payload.description,
      startDateTime: '2022-11-12T08:00',
      endDateTime: '2022-11-12T10:00',
      bookingId: 14,
      room_FK: action.payload.roomId,
      isRecurring: true,
      recurringId: 10,
      invitations: [],
      daysOfWeek: ['2', '4'],
    },
    {
      title: action.payload.title,
      description: action.payload.description,
      startDateTime: '2022-11-14T08:00',
      endDateTime: '2022-11-14T10:00',
      bookingId: 15,
      room_FK: action.payload.roomId,
      isRecurring: true,
      recurringId: 10,
      invitations: [],
      daysOfWeek: ['2', '4'],
    },
    ]
  }
  const success = response.data.map((event: any) => ({
    title: event.title,
    start: event.startDateTime,
    end: event.endDateTime,
    extendedProps: {
      bookingId: event.bookingId,
      roomId: event.room_FK,
      description: event.description,
      isRecurring: event.isRecurring,
      recurringId: event.recurringId,
      invitations: event.invitations,
      daysOfWeek: event.daysOfWeek,
    }
  }))

  it('saga addRecurringBooking success', () => {
    saga = addRecurringBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.post, { url: 'bookings/recurring', body: action.payload }));
    expect(saga.next(response).value).toEqual(
      put(addBookingSuccess(success))
    );
    saga.next();
    saga.next();
    expect(saga.next().done).toBeTruthy();
  });
});

describe('saga addRecurringBooking error 400 test', () => {
  const error = {
    response: {
      data: {
        message: "description should not be empty",
        statusCode: 400,
      },
    }
  };
  const action = {
    payload: actionAddRecurringBooking,
    type: 'booking/addRecurringBooking'
  }
  it('addRecurringBooking error 400', () => {
    saga = addRecurringBooking(action);

    expect(saga.next().value).toEqual(call(bookingService.post, { url: 'bookings/recurring', body: action.payload }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.data.message }))
    )

    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga deleteBooking test', () => {
  const actionDeleteBooking = { id: 12, isRecurring: false }
  const action = {
    payload: actionDeleteBooking,
    type: 'booking/deleteBookingById'
  }

  it('saga deleteBooking success', () => {
    saga = deleteBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.delete, { url: `bookings/${actionDeleteBooking.isRecurring ? 'recurring' : 'one-time'}/${actionDeleteBooking.id}` }));
    expect(saga.next().value).toEqual(
      put(deleteBookingSuccess(actionDeleteBooking))
    )
    saga.next()
    saga.next()
    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga deleteBooking error 403 test', () => {
  const error = {
    response: {
      data: {
        message: "Booking by this ID does not exist",
        statusCode: 403,
      },
    }
  }
  const actionDeleteBooking = { id: 12, isRecurring: true }
  const action = {
    payload: actionDeleteBooking,
    type: 'booking/deleteBookingById'
  }

  it('saga deleteBooking error', () => {
    saga = deleteBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.delete, { url: `bookings/${actionDeleteBooking.isRecurring ? 'recurring' : 'one-time'}/${actionDeleteBooking.id}` }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.data.message }))
    )
    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga editOneBooking test', () => {
  const action = {
    payload: actionEditOneBooking,
    type: 'booking/editOneBooking'
  }
  const response = {
    data: { bookingId: 10 }
  }
  const success = response.data.bookingId

  it('saga editOneBooking success', () => {
    saga = editOneBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.patch, { url: 'bookings/one-time', body: action.payload }));
    expect(saga.next(response).value).toEqual(
      put(editOneBookingSuccess(success))
    )
    saga.next()
    saga.next()
    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga editOneBooking error 400 test', () => {
  const error = {
    response: {
      data: {
        message: "Booking already exist in this time",
        statusCode: 400,
      },
    }
  }
  const action = {
    payload: actionEditOneBooking,
    type: 'booking/editOneBooking'
  }

  it('saga editOneBooking error', () => {
    saga = editOneBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.patch, { url: 'bookings/one-time', body: action.payload }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.data.message }))
    )
    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga editRecurringBooking test', () => {
  const action = {
    payload: actionEditRecurringBooking,
    type: 'booking/editRecurringBooking'
  }
  const response = {
    data: { recurringId: 5 }
  }
  const success = response.data.recurringId

  it('saga editRecurringBooking success', () => {
    saga = editRecurringBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.patch, { url: 'bookings/recurring', body: action.payload }));
    expect(saga.next(response).value).toEqual(
      put(editRecurringBookingSuccess(success))
    )
    saga.next()
    saga.next()
    expect(saga.next().done).toBeTruthy()
  })
})

describe('saga editRecurringBooking error 400 test', () => {
  const error = {
    response: {
      data: {
        message: "Booking already exist in this time",
        statusCode: 400,
      },
    }
  }
  const action = {
    payload: actionEditRecurringBooking,
    type: 'booking/editRecurringBooking'
  }

  it('saga editRecurringBooking error', () => {
    saga = editRecurringBooking(action);
    expect(saga.next().value).toEqual(call(bookingService.patch, { url: 'bookings/recurring', body: action.payload }));
    expect(saga.throw(error).value).toEqual(
      put(setBookingError({ errorMsg: error.response.data.message }))
    )
    saga.next()

    expect(saga.next().done).toBeTruthy()
  })
})
