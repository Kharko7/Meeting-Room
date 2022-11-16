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
  resetState,
  setBookingError,
  setSelectedDate,
} from "redux&saga/slices/booking.slice";
import dayjs from "dayjs";
import { Errors } from "constants/errors";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";
import { BookingEvent } from "interfaces/booking/Booking";
//@ts-ignore
const ModalOwnRooms = ({ setOpenModal }) => {
  const weekends = getFromLocalStorage("weekends");
  const { setAlert } = useContext(SnackBarContext);
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
  } = useAppSelector((state) => state.booking);
  console.log(title, description, loading);
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
    /// To Do axios Remove Event by ID /////////////////////
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

    const eventOneDay = {
      title: title,
      description: description,
      roomId: 1,
      startDateTime: start,
      endDateTime: end,
    };
    const eventRecurring = {
      title: title,
      description: description,
      roomId: 1,
      startDate: dayjs(start).format("YYYY-MM-DD"),
      startTime: dayjs(start).format("HH:mm"),
      endDate: dayjs(end).format("YYYY-MM-DD"),
      endTime: dayjs(end).format("HH:mm"),
      daysOfWeek: daysOfWeek,
    };

    const existEvent = bookings.some(
      (event: BookingEvent) => event.extendedProps.bookingId === bookingId
    );
    if (!existEvent) {
      if (daysOfWeek.length) {
        dispatch(addRecurringBooking(eventRecurring));
      } else {
        dispatch(addOneBooking(eventOneDay));
      }
    }

    ////To Do axios edit//////////////////
    handleCloseModal();
  };
  return (
    <Modal data-testid="modal-1" closeModal={handleCloseModal}>
      {loading ? (
        <Loader size="medium"></Loader>
      ) : (
        <BookingForm
          handleSubmit={handleSubmit}
          handleRemoveEvent={handleRemoveEvent}
          edit={Boolean(bookingId)}
        />
      )}
    </Modal>
  );
};

export default ModalOwnRooms;
