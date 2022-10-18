import { useState } from 'react'
import { EventApi, DateSelectArg } from '@fullcalendar/react'

const initialValues = {
  id: '',
  title: '',
  start: null,
  end: null,
  allDay: false,
  backgroundColor: '',
  borderColor: ''
}

//type Event =  ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Dayjs | null | SelectChangeEvent<string>

const useBooking = ({ onSubmit, removeEvent }: any) => {
  const [data, setData] = useState<any>(initialValues)
  const [selectedDateInfo, setSelectedDateInfo] = useState<DateSelectArg | null>(null)
  const [selectedEventInfo, setSelectedEventInfo] = useState<EventApi | null>(null)

  const setSelectedDate = (selectInfo: DateSelectArg) => {
    setSelectedDateInfo(selectInfo)
    setData({
      ...data,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    })
  }

  const setSelectedEvent = (eventInfo: EventApi) => {
    setSelectedEventInfo(eventInfo)
    setData({
      ...data,
      title: eventInfo.title,
      start: eventInfo.startStr,
      end: eventInfo.endStr,
      backgroundColor: eventInfo.backgroundColor,
      borderColor: eventInfo.borderColor,
    })
  }

  const handleChangeData = (key: string) => (event: any) => {
    switch (key) {
      case 'title':
        setData({
          ...data,
          [key]: event.target.value
        });
        break;
      case 'start':
        if (event.isValid()) {
          setData({
            ...data,
            [key]: event.toISOString(),
          });
        }
        break;
      case 'end':
        if (event.isValid()) {
          setData({
            ...data,
            [key]: event.toISOString(),
          });
        }
        break;
      case 'backgroundColor':
        setData({
          ...data,
          [key]: event.target.value,
          borderColor: event.target.value,
        });
        break;
      default:
        setData({ ...data });
    }
  }

  const handleSubmit = ((event: any) => {
    event.preventDefault()
    onSubmit()
    setData(initialValues)
  })

  const handleRemoveEvent = (() => {
    removeEvent()
    setData(initialValues)
  })


  return {
    data,
    selectedDateInfo,
    selectedEventInfo,
    handleChangeData,
    handleSubmit,
    setSelectedDate,
    setSelectedEvent,
    handleRemoveEvent,
  }
}

export default useBooking
