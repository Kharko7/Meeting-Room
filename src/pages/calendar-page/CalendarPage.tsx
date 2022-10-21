import { Box } from '@mui/material';
import SideBar from "../layout/sideBar";
import React, { useCallback, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './calendarPage.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { CalendarApi, DateSelectArg, EventInput } from '@fullcalendar/react';
import Modal from 'components/modal';
import BookingFormAdd from 'components/booking-form-add/BookingFormAdd';
import { setInitialState, setSelectedDate } from 'redux/booking/booking.actions';
import Calendar from 'components/calendar/Calendar';

const cn = classNames.bind(styles)

const CalendarPage = () => {
  const [calendarApi, setCalendarApi] = useState<CalendarApi | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const data = useSelector(({ Booking }: EventInput) => Booking);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(setInitialState());
  };

  const memoizedDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      dispatch(setSelectedDate(selectInfo))
      setCalendarApi(selectInfo.view.calendar)
      setOpenModal(true);
      selectInfo.view.calendar.unselect()
    },
    [dispatch],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(data)
    event.preventDefault()
    calendarApi?.addEvent(data)
    handleCloseModal();
  }

  return (
    <div className={cn("calendar_container")}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Calendar handleDateSelect={memoizedDateSelect} />
        {openModal &&
          <Modal closeModal={handleCloseModal}>
            <BookingFormAdd
              handleSubmit={handleSubmit}
            />
          </Modal>}
        {/*<SideBar userName={"Some Guy"}/>*/}
      </Box>
    </div>
  )
}

export default CalendarPage