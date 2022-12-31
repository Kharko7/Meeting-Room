import { Box } from "@mui/material";
import React, { useCallback, useState, useEffect, useContext, useRef } from "react";
import FullCalendar, { DateSelectArg, DatesSetArg, EventClickArg } from '@fullcalendar/react';
import { getFromLocalStorage } from 'services/local-storage.service';
import Calendar from 'components/calendar';
import BookingForm from 'components/booking-form';
import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks";
import {
  addOneBooking,
  addRecurringBooking,
  deleteBookingById,
  editBooking,
  editOneBooking,
  editRecurringBooking,
  getAllBookings,
  resetState,
  setBookingError,
  setSelectedDate,
} from "redux/slices/booking.slice";
import dayjs from "dayjs";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";
import { BookingEvent, FormValues } from "interfaces/Booking";
import { disabledPressedButton } from "utils/disabled-pressed-button";
import { SelectChangeEvent } from "@mui/material/Select";
import { setFloor, setRoomId } from 'redux/slices/booking.slice';
import CheckboxWithLabel from "components/checkbox-with-label";
import SelectorFloorAndRoom from "components/selector-floor-and-room/SelectorFloorAndRoom";
import ModalPopup from "components/modal-popup";
import { setEventBooking } from "utils/set-event-submit";

const CalendarPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showRoom, setShowRoom] = useState<string>('');
  const [request, setRequest] = useState<boolean>(false);
  const weekends = getFromLocalStorage('weekends')
  const { setAlert } = useContext(SnackBarContext)
  const dispatch = useAppDispatch();
  const calendarRef: React.MutableRefObject<FullCalendar | null> = useRef(null);
  const {
    bookingId,
    bookings,
    errors,
    loading,
    roomId,
    floor,
    isRecurring,
    recurringId,
  } = useAppSelector(state => state.booking);

  useEffect(() => {
    if (request) {
      setRequest(false)
      return
    }
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi().view
      const getFirstDay = dayjs(calendarApi.activeStart).format('YYYY-MM-DDTHH:mm');
      const getLastDay = dayjs(calendarApi.activeEnd).format('YYYY-MM-DDTHH:mm');
      dispatch(getAllBookings({ roomId: showRoom, startDate: getFirstDay, endDate: getLastDay }))
    }
  }, [showRoom, bookings.length, dispatch]);

  useEffect(() => {
    if (errors.errorMsg) {
      setAlert({
        severity: snackbarVariants.error,
        message: errors.errorMsg
      })
      dispatch(setBookingError({ errorMsg: '' }));
    }
  }, [dispatch, errors.errorMsg, setAlert]);

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
      const invitedUserId = event.extendedProps.invitations.length
        ? event.extendedProps.invitations.map((userId: any) => userId.invitedId_FK)
        : []
      const bookingEdit = {
        title: event.title,
        start: dayjs(event.start).format('YYYY-MM-DDTHH:mm'),
        end: dayjs(event.end).format('YYYY-MM-DDTHH:mm'),
        description: event.extendedProps.description,
        roomId: event.extendedProps.roomId,
        bookingId: event.extendedProps.bookingId,
        isRecurring: event.extendedProps.isRecurring,
        recurringId: event.extendedProps.recurringId,
        daysOfWeek: event.extendedProps.daysOfWeek,
        invitedId: invitedUserId,
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
      dispatch(getAllBookings({ roomId: showRoom, startDate: getFirstDay, endDate: getLastDay }))
      disabledPressedButton()
      setRequest(true)
    },
    [dispatch, showRoom]
  );

  const handleRemoveEvent = () => {
    if (bookingId) {
      dispatch(deleteBookingById({ id: recurringId ? recurringId : bookingId, isRecurring: isRecurring }))
    }
    handleCloseModal();
  };
  const handleSubmit = (values: FormValues) => {
    const { selectDays } = values
    const { eventOneDay, eventRecurring } = setEventBooking(values)

    const existEvent = bookings.some((event: BookingEvent) => event.extendedProps.bookingId === bookingId)
    if (!existEvent) {
      if (selectDays !== null && selectDays.length) {
        dispatch(addRecurringBooking(eventRecurring))
      } else {
        dispatch(addOneBooking(eventOneDay))
      }
    } else {
      isRecurring
        ? dispatch(editRecurringBooking({ ...eventRecurring, recurringId: recurringId, }))
        : dispatch(editOneBooking({ ...eventOneDay, bookingId: bookingId }))
    }
    handleCloseModal();
  };

  const handleShowAllRooms = () => {
    dispatch(setRoomId(null));
    dispatch(setFloor(''));
    setShowRoom('');
  }

  const handleChangeRoom = (e: SelectChangeEvent<string>) => {
    setShowRoom(e.target.value)
    dispatch(setRoomId(Number(e.target.value)));
  };

  const handleChangeFloor = (e: SelectChangeEvent<string>) => {
    dispatch(setFloor(e.target.value))
    dispatch(setRoomId(null))
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Box sx={{
        height: '100%',
        m: '10px 15px 14px 10px',
        backgroundColor: 'var(--calendar-bg)',
        boxShadow: 'var(--SCREENCALENDAR-box-shadow)',
        borderRadius: '15px'
      }}>
        <Box
          sx={{
            display: 'flex',
            width: '60%',
            gap: "15px",
            pt: '25px',
            m: '0px auto 0 auto',
          }}
        >
          <SelectorFloorAndRoom
            valueFloor={floor}
            valueRoom={roomId?.toString() || ''}
            onChangeFloor={handleChangeFloor}
            onChangeRoom={handleChangeRoom}
          />
          < CheckboxWithLabel
            disabled={Boolean(!showRoom)}
            label='Show all rooms'
            checked={Boolean(!showRoom)}
            onChange={handleShowAllRooms}
            sx={{ m: '0', color: 'var(--accent-text-color)', fontSize: '20px', flex: '0 0 auto' }}
          />
        </Box>
        <Calendar
          calendarRef={calendarRef}
          data={bookings}
          weekends={weekends}
          loading={loading}
          handleDateSelect={memoizedDateSelect}
          handleEventSelect={memoizedEventSelect}
          handleGetDate={memoizedGetDate}
        />
      </Box>
      <ModalPopup
        open={openModal}
        onClose={handleCloseModal}
      >
        <BookingForm
          handleSubmit={handleSubmit}
          handleRemoveEvent={handleRemoveEvent}
          edit={Boolean(bookingId)}
        />
      </ModalPopup>
    </Box >
  );
};

export default CalendarPage;
