import { useState } from 'react'
import { DateSelectArg } from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/react'
import debounce from 'lodash.debounce'

const initialValues: EventInput = {
  id: '',
  title: '',
  start: undefined,
  end: undefined,
  allDay: false,
  backgroundColor: '',
  borderColor: ''
}

//type Event =  ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Dayjs | null | SelectChangeEvent<string>

const useBooking = ({ onSubmit }: any) => {
  const [data, setData] = useState<EventInput>(initialValues)
  const [selectedDateInfo, setSelectedDateInfo] = useState<DateSelectArg | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const setSelectedDate = (selectInfo: DateSelectArg) => {
    setSelectedDateInfo(selectInfo)
    setData({
      ...data,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
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
          setErrors({ ...errors, [key]: '', })
          setData({
            ...data,
            [key]: event.toISOString(),
          });
        } else {
          setErrors({
            ...errors,
            [key]: 'Date not valid',
          })
        }
        break;
      case 'end':
        if (event.isValid()) {
          setErrors({ ...errors, [key]: '', })
          setData({
            ...data,
            [key]: event.toISOString(),
          });
        } else {
          setErrors({
            ...errors,
            [key]: 'date not valid',
          })
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

  const debouncechange = debounce(handleChangeData, 100)

  const handleSubmit = ((event: any) => {
    event.preventDefault()
    onSubmit()
    setData(initialValues)
  })

  return {
    data,
    errors,
    selectedDateInfo,
    debouncechange,
    handleChangeData,
    handleSubmit,
    setSelectedDate,
  }
}

export default useBooking
