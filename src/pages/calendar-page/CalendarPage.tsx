import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import styles from "./calendarPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { DateSelectArg, EventChangeArg, EventClickArg, EventInput } from '@fullcalendar/react';
import Modal from 'components/modal';
import { editBooking, resetState, setSelectedDate } from 'redux/booking/booking.actions';
import { INITIAL_EVENTS } from 'configs/initial-events';
import { getFromLocalStorage } from 'services/local-storage.service';
import Calendar from 'components/calendar';
import BookingForm from 'components/booking-form';

const cn = classNames.bind(styles);

const CalendarPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInput[]>(INITIAL_EVENTS);
  const data = useSelector(({ Booking }: EventInput) => Booking);
  const weekends = getFromLocalStorage('weekends')

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetState());
  };

  const memoizedDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      selectInfo.view.calendar.unselect();
      dispatch(setSelectedDate(selectInfo));
      setOpenModal(true);
    },
    [dispatch]
  );

  const memoizedEventSelect = useCallback(
    (eventInfo: EventClickArg) => {
      dispatch(editBooking(eventInfo.event));
      setOpenModal(true);
    },
    [dispatch]
  );

  const memoizedEventChange = useCallback((arg: EventChangeArg) => {
    ////// To Do axios when you drag event past id, start , end////////
  }, []);

  const handleRemoveEvent = () => {
    /// To Do axios Remove Event by ID /////////////////////
    handleCloseModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //const existEvent = events.some(event => event.id === data.id)
    setEvents(prev => [...prev, data])
    // if (!existEvent) {
    //   //setEvents(prev => [...prev, data])
    //   ////To Do axios add//////////////////
    // }
    ////To Do axios edit//////////////////
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Calendar
        data={events}
        weekends={weekends}
        handleDateSelect={memoizedDateSelect}
        handleEventSelect={memoizedEventSelect}
        handleEventChange={memoizedEventChange}
      />
      {openModal &&
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(data.id)}
          />
        </Modal>
      )}
    </Box>
  );
};

export default CalendarPage;
