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
const ModalRooms = ({ setOpenModal }) => {
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
    invitedId,
    errors,
    loading,
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
      daysOfWeek: daysOfWeek ? daysOfWeek.map(id => Number(id)) : daysOfWeek,
      invitations: invitedId,
    };

    const existEvent = bookings.some(
      (event: BookingEvent) => event.extendedProps.bookingId === bookingId
    );
    if (!existEvent) {
      if (daysOfWeek !== null && daysOfWeek.length) {
        dispatch(addRecurringBooking(eventRecurring));
      } else {
        dispatch(addOneBooking(eventOneDay));
      }
    } 
    handleCloseModal();
  };
  return (
    <Modal data-testid="modal-1" closeModal={handleCloseModal}>
      {loading ? (
        <div style={{ paddingTop: "20px" }}>
          <Loader size="medium"></Loader>
        </div>
      ) : (
        <BookingForm
          linkToCalendar={true}
          handleSubmit={handleSubmit}
          handleRemoveEvent={handleRemoveEvent}
          edit={false}
        />
      )}
    </Modal>
  );
};

export default ModalRooms;
