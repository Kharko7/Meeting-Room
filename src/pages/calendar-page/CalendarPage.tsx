import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react';
import Modal from 'components/modal';
import { INITIAL_EVENTS } from 'configs/initial-events';
import { getFromLocalStorage } from 'services/local-storage.service';
import Calendar from 'components/calendar';
import BookingForm from 'components/booking-form';
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import {
  editBooking,
  resetState,
  setBookingError,
  setSelectedDate,
} from "redux&saga/slices/booking.slice";
import dayjs from "dayjs";
import { Errors } from "constants/errors";

const CalendarPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInput[]>(INITIAL_EVENTS);
  const weekends = getFromLocalStorage('weekends')
  const dispatch = useAppDispatch();

  const bookingData = useAppSelector(state => state.booking);
  const { extendedProps } = bookingData
  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetState());
  };

  const memoizedDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      selectInfo.view.calendar.unselect();
      setOpenModal(true);
      const startDate = dayjs(selectInfo.start).format('YYYY-MM-DDTHH:mm')
      const endDate = dayjs(selectInfo.end).format('YYYY-MM-DDTHH:mm')
      dispatch(setSelectedDate({ start: startDate, end: endDate }));
    },
    [dispatch]
  );
  const memoizedEventSelect = useCallback(
    (eventInfo: EventClickArg) => {
      const event = eventInfo.event
      const bookingEdit = {
        title: event.title,
        start: event.startStr,
        end: event.endStr,
        description: event.extendedProps.description,
        daysOfWeek: event.extendedProps.daysOfWeek,
        roomId: event.extendedProps.roomId,
        floor: event.extendedProps.floor,
      }
      dispatch(editBooking(bookingEdit));
      setOpenModal(true);
    },
    [dispatch]
  );

  const handleRemoveEvent = () => {
    /// To Do axios Remove Event by ID /////////////////////
    handleCloseModal();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!extendedProps.roomId) {
      if (!extendedProps.floor) {
        dispatch(setBookingError({ floor: Errors.floor }))
      }
      dispatch(setBookingError({ roomId: Errors.roomId }))
      return
    }

    //const existEvent = events.some(event => event.id === data.id)
    setEvents(prev => [...prev, bookingData])
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
      />
      {openModal &&
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingData.extendedProps.bookingId)}
          />
        </Modal>
      }
    </Box>
  );
};

export default CalendarPage;
