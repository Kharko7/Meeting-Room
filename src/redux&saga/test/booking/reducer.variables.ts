export const initialState = {
  title: '',
  start: '',
  end: '',
  loading: false,
  floor:'1',
  roomId: null,
  description: '',
  invitedIds: [],
  errors: {},
  daysOfWeek: [],
  bookings: [],
};

export const state = {
  title: 'Event',
  start: "2022-11-19T00:00",
  end: "2022-11-19T00:00",
  loading: false,
  floor: '2',
  roomId: 14,
  description: 'This is my event',
  invitedIds: [],
  errors: {},
  daysOfWeek: ['1', '2', '4'],
  bookings: [],
};

export const bookingEdit = {
  title: 'Meeting',
  start: "2022-11-19T00:00",
  end: "2022-11-19T00:00",
  description: 'Very good booking',
  roomId: 4,
  bookingId: 22,
}

export const roomId = 123456;
export const text = "My event";
export const daysOfWeek = ['1', '2', '4']
export const error = { title: 'error title', floor: 'choose floor' };
export const dateStart = "2022-11-19T14:00";
export const dateEnd = "2022-11-19T18:00";

