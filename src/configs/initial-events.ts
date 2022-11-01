import { EventInput } from '@fullcalendar/react'

let todayStr = new Date().toISOString().replace(/T.*$/, '')

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: todayStr + 'T02:00',
    end: todayStr + 'T10:00',
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [],
      roomId: 6,
      floor: '1',
    },
  },
  {
    id: '22',
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T14:00:00',
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [],
      roomId: 17,
      floor: '3',
    },
  },
  {
    id: '2',
    title: 'My event',
    start: todayStr + 'T14:00:00',
    end: todayStr + 'T18:00:00',
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [],
      roomId: 2,
      floor: '1',
    },
  },
  {
    id: '3',
    title: 'event 1',
    start: todayStr + 'T19:00:00',
    end: todayStr + 'T22:00:00',
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [1, 2, 4, 5],
      roomId: 1,
      floor: '1',
    },
  },
  {
    id: '4',
    title: 'event 1',
    start: '2022-10-10T02:53:18+03:00',
    end: '2022-10-10T04:53:18+03:00',
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [4,5,6],
      roomId: 4,
      floor: '1',
    },
  },
  {
    title: 'event 15555',
    start: '2022-10-08T21:42:58',
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [],
      roomId: 4,
      floor: '1',
    },
  },
  {

    title: 'aaaaaaaaaaaaaa',
    start: "2022-11-19T00:00",
    end: "2022-11-19T02:00",
    extendedProps: {
      errors: { title: '', roomId: '' },
      description: 'First commit',
      invitedIds: [],
      daysOfWeek: [2],
      roomId: 14,
      floor: '2',
    },
  },
]

