import { BookingEvent } from "interfaces/booking/Booking";

export const checkMatchStartDate = (bookings: BookingEvent[], startDate: string, endDate: string) => {
  return bookings.some((event: BookingEvent) => {
    let newStartСrossed = true
    let existEndСrossed = true
    const existDateStart = new Date(event.start)
    const existDateEnd = new Date(event.end)
    existEndСrossed = existEndСrossed && (new Date(startDate) < existDateEnd)
    existEndСrossed = existEndСrossed && (new Date(endDate) > existDateEnd)
    //////check inside exist event///////
    newStartСrossed = newStartСrossed && (existDateStart < new Date(startDate))
    newStartСrossed = newStartСrossed && (existDateEnd > new Date(startDate))

    return existEndСrossed || newStartСrossed
  })
}

export const checkMatchEndDate = (bookings: BookingEvent[], startDate: string, endDate: string) => {
  return bookings.some((event: BookingEvent) => {
    let existStartСrossed = true
    let newEndСrossed = true
    const existDateStart = new Date(event.start)
    const existDateEnd = new Date(event.end)
    existStartСrossed = existStartСrossed && (new Date(startDate) < existDateStart)
    existStartСrossed = existStartСrossed && (new Date(endDate) > existDateStart)
    //////check inside exist event///////
    newEndСrossed = newEndСrossed && (existDateStart < new Date(endDate))
    newEndСrossed = newEndСrossed && (existDateEnd > new Date(endDate))

    return existStartСrossed || newEndСrossed
  })
}
