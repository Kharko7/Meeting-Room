import dayjs from "dayjs"
import { FormValues } from "interfaces/Booking"

export const setEventBooking = (values: FormValues) => {
  const {
    title,
    description,
    selectRoom,
    iviteCoworkers,
    dateStart,
    dateEnd,
    selectDays,
  } = values

  const baseParams = {
    title: title,
    description: description,
    roomId: Number(selectRoom),
    invitations: iviteCoworkers,
  }
  const eventOneDay = {
    ...baseParams,
    startDateTime: dateStart,
    endDateTime: dateEnd,
  }
  const eventRecurring = {
    ...baseParams,
    startDate: dayjs(dateStart).format('YYYY-MM-DD'),
    startTime: dayjs(dateStart).format('HH:mm'),
    endDate: dayjs(dateEnd).format('YYYY-MM-DD'),
    endTime: dayjs(dateEnd).format('HH:mm'),
    daysOfWeek: selectDays.length ? selectDays.map((id: string) => Number(id)) : selectDays,
  }

  return { eventOneDay, eventRecurring }
}