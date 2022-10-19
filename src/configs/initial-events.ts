import { EventInput } from '@fullcalendar/react'

let todayStr = new Date().toISOString().replace(/T.*$/, '')

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: todayStr,
    end: todayStr + 'T10:00:00',
    backgroundColor: 'Silver',
    borderColor: 'Silver'
  },
  {
    id: '22',
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T14:00:00',
    backgroundColor: '#28bbea',
    borderColor: '#28bbea'
  },
  {
    id: '2',
    title: 'My event',
    start: todayStr + 'T14:00:00',
    end: todayStr + 'T18:00:00',
    backgroundColor: 'DarkSeaGreen',
    borderColor: 'DarkSeaGreen'
  },
  {
    id: '3',
    title: 'event 1',
    start: todayStr + 'T19:00:00',
    end: todayStr + 'T22:00:00',
    backgroundColor: 'SandyBrown',
    borderColor: 'SandyBrown'
  },
  {
    id: '4',
    title: 'event 1',
    start:'2022-10-10T02:53:18+03:00',
    end: '2022-10-10T04:53:18+03:00',
    backgroundColor: '#7986cb',
    borderColor: '#7986cb'
  },
  {
    id: '5',
    title: 'event 1',
    start:'2022-10-08T21:42:58',
    backgroundColor: '#28bbea',
    borderColor: '#28bbea'
  }
]