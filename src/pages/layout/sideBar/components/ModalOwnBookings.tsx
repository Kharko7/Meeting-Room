import Modal from "components/modal/Modal";
import axios from "axios";
import BookingForm from "components/booking-form";
import React, { useEffect, useContext } from "react";
import Loader from "pages/layout/loader/Loader";
import { getFromLocalStorage } from "services/local-storage.service";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";

import {
  addOneBooking,
  addRecurringBooking,
  editBooking,
  getAllBookings,
  editOneBooking,
  editOwnBooking,
  resetState,
  deleteBookingById,
  editRecurringBooking,
  setBookingError,
  setSelectedDate,
} from "redux&saga/slices/booking.slice";
import dayjs from "dayjs";
import { Errors } from "constants/errors";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";
import { BookingEvent } from "interfaces/booking/Booking";
//@ts-ignore
const ModalOwnRooms = ({ setOpenModal, booking }) => {
  const weekends = getFromLocalStorage("weekends");
  const { setAlert } = useContext(SnackBarContext);
  const dispatch = useAppDispatch();
  const ownBookings = useAppSelector((state) => state.ownBookings.bookings);
  const { limit, totalCount, page } = useAppSelector(
    (state) => state.ownBookings
  );
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
    invitedId,
    errors,
    loading,
    isRecurring,
  } = useAppSelector((state) => state.booking);
  useEffect(() => {
    if (errors.errorMsg) {
      setAlert({
        severity: snackbarVariants.error,
        message: errors.errorMsg,
      });
      dispatch(setBookingError({ errorMsg: "" }));
    }
  }, [dispatch, errors.errorMsg, setAlert]);

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetState());
  };
  const handleRemoveEvent = () => {
    if (bookingId) {
      dispatch(
        deleteBookingById({
          id: bookingId,
          isRecurring: isRecurring,
        })
      );
    }
    handleCloseModal();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomId) {
      if (!floor) {
        dispatch(setBookingError({ floor: Errors.floor }));
      }
      dispatch(setBookingError({ roomId: Errors.roomId }));
      return;
    }
    const baseParams = {
      title: title,
      description: description,
      roomId: roomId,
      invitations: invitedId,
      bookingId: bookingId,
    };

    const eventOneDay = {
      ...baseParams,
      startDateTime: start,
      endDateTime: end,
    };

    const eventRecurring = {
      ...baseParams,
      startDate: dayjs(start).format("YYYY-MM-DD"),
      startTime: dayjs(start).format("HH:mm"),
      endDate: dayjs(end).format("YYYY-MM-DD"),
      endTime: dayjs(end).format("HH:mm"),
      recurringId: null,
      daysOfWeek: daysOfWeek ? daysOfWeek.map(id => Number(id)) : daysOfWeek,
      invitedId: invitedId,

    };
    const existEvent = ownBookings.some(
      (event: any) => event.bookingId === bookingId
    );
    if (existEvent) {
      if (daysOfWeek !== null &&  !daysOfWeek.length) {
        dispatch(editOneBooking(eventOneDay));
      } else {
        dispatch(editRecurringBooking(eventRecurring));
      }
    }
  };
  return (
    <Modal data-testid="modal-1" closeModal={handleCloseModal}>

        <BookingForm
          handleSubmit={handleSubmit}
          handleRemoveEvent={handleRemoveEvent}
          edit={true}
        />
    </Modal>
  );
};

export default ModalOwnRooms;
