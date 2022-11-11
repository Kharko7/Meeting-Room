import { Box } from "@mui/material";
import React, { useCallback, useState, useEffect, useContext } from "react";
import { DateSelectArg, DatesSetArg, EventClickArg } from '@fullcalendar/react';
import Modal from 'components/modal';
import { getFromLocalStorage } from 'services/local-storage.service';
import Calendar from 'components/calendar';
import BookingForm from 'components/booking-form';
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import {
  addOneBooking,
  addRecurringBooking,
  editBooking,
  getAllBookings,
  resetState,
  setBookingError,
  setSelectedDate,
} from "redux&saga/slices/booking.slice";
import dayjs from "dayjs";
import { Errors } from "constants/errors";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";
import { BookingEvent } from "interfaces/booking/Booking";
import { disabledPressedButton } from "utils/disabled-pressed-button";

const CalendarPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const weekends = getFromLocalStorage('weekends')
  const { setAlert } = useContext(SnackBarContext)
  const dispatch = useAppDispatch();
  const {
    title,
    description,
    start,
    end,
    roomId,
    floor,
    bookingId,
    bookings,
    daysOfWeek,
    errors,
    loading,
  } = useAppSelector(state => state.booking);

  useEffect(() => {
    if (errors.errorMsg) {
      setAlert({
        severity: snackbarVariants.error,
        message: errors.errorMsg
      })
      dispatch(setBookingError({ errorMsg: '' }));
    }
  }, [dispatch, errors.errorMsg, setAlert])

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
        bookingId: event.extendedProps.bookingId,
      }
      dispatch(editBooking(bookingEdit));
      setOpenModal(true);
    },
    [dispatch]
  );
  const memoizedGetDate = useCallback(
    (dateInfo: DatesSetArg) => {
      const getFirstDay = dayjs(dateInfo.start).format('YYYY-MM-DDTHH:mm');
      const getLastDay = dayjs(dateInfo.end).format('YYYY-MM-DDTHH:mm');
      dispatch(getAllBookings({ startDate: getFirstDay, endDate: getLastDay }))
      disabledPressedButton()
    },
    [dispatch]
  );

  const handleRemoveEvent = () => {
    /// To Do axios Remove Event by ID /////////////////////
    handleCloseModal();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!roomId) {
      if (!floor) {
        dispatch(setBookingError({ floor: Errors.floor }))
      }
      dispatch(setBookingError({ roomId: Errors.roomId }))
      return
    }

    const eventOneDay = {
      title: title,
      description: description,
      roomId: 1,
      startDateTime: start,
      endDateTime: end,
    }
    const eventRecurring = {
      title: title,
      description: description,
      roomId: 1,
      startDate: dayjs(start).format('YYYY-MM-DD'),
      startTime: dayjs(start).format('HH:mm'),
      endDate: dayjs(end).format('YYYY-MM-DD'),
      endTime: dayjs(end).format('HH:mm'),
      daysOfWeek: daysOfWeek
    }

    const existEvent = bookings.some((event: BookingEvent) => event.extendedProps.bookingId === bookingId)
    if (!existEvent) {
      if (daysOfWeek.length) {
        dispatch(addRecurringBooking(eventRecurring))
      } else {
        dispatch(addOneBooking(eventOneDay))
      }
    }

    ////To Do axios edit//////////////////
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Calendar
        data={bookings}
        weekends={weekends}
        loading={loading}
        handleDateSelect={memoizedDateSelect}
        handleEventSelect={memoizedEventSelect}
        handleGetDate={memoizedGetDate}
      />
      {openModal &&
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingId)}
          />
        </Modal>
      }
    </Box>
  );
};

export default CalendarPage;
