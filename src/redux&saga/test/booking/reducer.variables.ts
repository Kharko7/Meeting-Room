export const initialState = {
  title: '',
  start: '',
  end: '',
  loading: false,
  floor: '',
  roomId: null,
  description: '',
  invitedId: [],
  errors: {},
  daysOfWeek: [],
  bookings: [],
  bookingId: null,
  isRecurring: false,
  recurringId: null,
};

export const state = {
  title: 'Event',
  start: "2022-11-19T00:00",
  end: "2022-11-19T00:00",
  loading: false,
  floor: '2',
  roomId: 14,
  description: 'This is my event',
  invitedId: [],
  errors: {},
  bookings: [],
  bookingId: null,
  isRecurring: false,
  recurringId: null,
  daysOfWeek: [],
};

export const bookingEdit = {
  title: 'Meeting',
  start: "2022-11-19T00:00",
  end: "2022-11-19T00:00",
  description: 'Very good booking',
  roomId: 4,
  floor: '2',
  bookingId: 22,
  isRecurring: false,
  recurringId: null,
  daysOfWeek: ['1', '2', '4'],
  invitedId: [],
}

export const bookingsSuccsess = [{
  title: "First meeting",
  start: "2022-11-12T12:00",
  end: "2022-11-12T14:00",
  extendedProps: {
    bookingId: 1,
    roomId: 1,
    description: "First meeting 01",
    isRecurring: false,
    recurringId: null,
    invitations: [],
    daysOfWeek: null,
  }
}]
export const actionDeleteById = {
  id: 1,
  isRecurring: false,
}
export const roomId = 123456;
export const text = "My event";
export const daysOfWeek = ['1', '2', '4']
export const error = { title: 'error title', floor: 'choose floor' };
export const dateStart = "2022-11-19T14:00";
export const dateEnd = "2022-11-19T18:00";
export const actionGetAllBookings = { roomId: 1, startDate: '2022-10-12T00:00', endDate: '2022-12-21T00:00' }
export const actionAddOneBooking = {
  title: 'Event 2',
  description: 'My event',
  roomId: 1,
  startDateTime: '2022-11-12T08:00',
  endDateTime: '2022-11-12T10:00',
  invitations: [],
}
export const actionEditOneBooking = {
  ...actionAddOneBooking,
  title: 'event 3',
  bookingId: 10
}
export const actionAddRecurringBooking = {
  title: 'Event 2',
  description: 'My event',
  roomId: 1,
  startDate: '2022-11-12',
  startTime: '08:00',
  endDate: '2022-11-18',
  endTime: '10:00',
  daysOfWeek: [4],
  invitations: [],
};

export const actionEditRecurringBooking = {
  ...actionAddRecurringBooking,
  title: 'Recurring',
  recurringId: 5,
};

export const urlGetAllBookings = "bookings?roomId=1&startDate=2022-10-12T00:00&endDate=2022-12-21T00:00";

export const invitations = [1, 2, 3]