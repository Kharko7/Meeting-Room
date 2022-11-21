import { Box } from "@mui/material";
import React, { useCallback, useState, useEffect, useContext, useRef } from "react";
import FullCalendar, { DateSelectArg, DatesSetArg, EventClickArg } from '@fullcalendar/react';
import Modal from 'components/modal';
import { getFromLocalStorage } from 'services/local-storage.service';
import Calendar from 'components/calendar';
import BookingForm from 'components/booking-form';
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
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
} from "redux&saga/slices/booking.slice";
import dayjs from "dayjs";
import { Errors } from "constants/errors";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";
import { BookingEvent } from "interfaces/booking/Booking";
import { disabledPressedButton } from "utils/disabled-pressed-button";
import Selector from 'components/booking-form/selector/Selector';
import { floors, rooms } from "constants/booking-form";
import { MenuItem } from '@material-ui/core';
import { SelectChangeEvent } from "@mui/material/Select";
import { setFloor, setRoomId } from 'redux&saga/slices/booking.slice';
import CheckboxWithLabel from "components/checkbox-with-label";
import SelectorFloorAndRoom from "components/booking-form/selector/SelectorFloorAndRoom";

const CalendarPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showRoom, setShowRoom] = useState<string>('');
  const [showFloor, setShowFloor] = useState<string>('');
  const weekends = getFromLocalStorage('weekends')
  const { setAlert } = useContext(SnackBarContext)
  const dispatch = useAppDispatch();
  const calendarRef: React.MutableRefObject<FullCalendar | null> = useRef(null);
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
    invitedId,
    isRecurring,
    recurringId,
  } = useAppSelector(state => state.booking);

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

  const refreshCalendar = (delay: number) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current?.getApi()
      setTimeout(() => {
        calendarApi.gotoDate(calendarApi.view.currentStart);
      }, delay)
    }
  }

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
      //const floorByRoom = rooms.find((room: any) => room.roomId === event.extendedProps.roomId)
      const bookingEdit = {
        title: event.title,
        start: event.startStr,
        end: event.endStr,
        description: event.extendedProps.description,
        roomId: event.extendedProps.roomId,
        floor: '',
        bookingId: event.extendedProps.bookingId,
        isRecurring: event.extendedProps.isRecurring,
        recurringId: event.extendedProps.recurringId
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
    },
    [dispatch, showRoom]
  );

  const handleRemoveEvent = () => {
    if (bookingId) {
      dispatch(deleteBookingById({ id: recurringId ? recurringId : bookingId, isRecurring: isRecurring }))
    }
    handleCloseModal();
    if (calendarRef.current) {
      refreshCalendar(500)
    }
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

    const baseParams = {
      title: title,
      description: description,
      roomId: roomId,
      invitations: invitedId,
    }
    const eventOneDay = {
      ...baseParams,
      startDateTime: start,
      endDateTime: end,
    }
    const eventRecurring = {
      ...baseParams,
      startDate: dayjs(start).format('YYYY-MM-DD'),
      startTime: dayjs(start).format('HH:mm'),
      endDate: dayjs(end).format('YYYY-MM-DD'),
      endTime: dayjs(end).format('HH:mm'),
      daysOfWeek: daysOfWeek,
    }

    const existEvent = bookings.some((event: BookingEvent) => event.extendedProps.bookingId === bookingId)
    if (!existEvent) {
      if (daysOfWeek.length) {
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
    refreshCalendar(1000)
  };

  const handleShowAllRooms = () => {
    setShowRoom('')
    setShowFloor('');
    dispatch(setRoomId(null));
    dispatch(setFloor(''));
    if (calendarRef.current) {
      refreshCalendar(0)
    }
  }

  const handleChangeRoom = (e: SelectChangeEvent<string>) => {
    setShowRoom(e.target.value)
    dispatch(setRoomId(Number(e.target.value)));
    //const floorByRoom = rooms.find((room: any) => room.roomId === Number(e.target.value))

    // dispatch(setFloor(floorByRoom?.floor || ''))
    refreshCalendar(0)
  };
  const handleChangeFloor = (e: SelectChangeEvent<string>) => {
    dispatch(setFloor(e.target.value))
    setShowFloor(e.target.value);
  };

  // const roomsByFloor = rooms.filter((room) => {
  //   return room.floor === showFloor
  // })
  // const menuItemsRoom = roomsByFloor.map((room) => (
  //   <MenuItem
  //     key={room.roomId}
  //     value={room.roomId}>
  //     {room.name}
  //   </MenuItem>
  // ))
  // const menuItemsFloor = floors.map((floor) => (
  //   <MenuItem
  //     key={floor}
  //     value={floor}>
  //     {floor}
  //   </MenuItem>
  // ))

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Box sx={{
        height: '100%',
        m: '10px 15px 13px 10px',
        backgroundColor: 'var(--calendar-bg)',
        boxShadow: 'var(--SCREENCALENDAR-box-shadow)',
        borderRadius: '10px'
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
            valueFloor={showFloor}
            valueRoom={showRoom}
            onChangeFloor={handleChangeFloor}
            onChangeRoom={handleChangeRoom}
          />


          {/* <Selector
            label="Choose floor"
            value={showFloor}
            menuItems={menuItemsFloor}
            dataTestId="selector-floor"
            onChange={handleChangeFloor}
          />
          <Selector
            label="Choose room"
            value={showRoom}
            disabled={!showFloor}
            menuItems={menuItemsRoom}
            dataTestId="selector-room"
            onChange={handleChangeRoom}
          /> */}
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
      {
        openModal &&
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingId)}
          />
        </Modal>
      }
    </Box >
  );
};

export default CalendarPage;
