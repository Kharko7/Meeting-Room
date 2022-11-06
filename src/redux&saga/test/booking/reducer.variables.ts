export const initialState = {
  title: '',
  start: '',
  end: '',
  extendedProps: {
    floor: null,
    roomId: null,
    description: '',
    invitedIds: [],
    errors: {},
    daysOfWeek: [],
  }
};

export const state = {
  title: 'Event',
  start: "2022-11-19T00:00",
  end: "2022-11-19T00:00",
  extendedProps: {
    floor: '2',
    roomId: 14,
    description: 'This is my event',
    invitedIds: [],
    errors: {},
    daysOfWeek: ['1', '2', '4'],
  }
};

export const bookingEdit = {
  title: 'Meeting',
  start: "2022-11-19T00:00",
  end: "2022-11-19T00:00",
  description: 'Very good booking',
  daysOfWeek: [],
  roomId: 3,
  floor: '1',
}

export const roomId = 123456;
export const text = "My event";
export const daysOfWeek = ['1', '2', '4']
export const error = { title: 'error title', floor: 'choose floor' };
export const dateStart = "2022-11-19T14:00";
export const dateEnd = "2022-11-19T18:00";

