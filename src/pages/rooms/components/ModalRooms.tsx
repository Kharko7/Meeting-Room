
import Modal from "components/modal/Modal";

import BookingForm from "components/booking-form";


import React from "react";

import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import { bookingActions } from "redux&saga/slices/booking.slice";

import { Errors } from "constants/errors";
//@ts-ignore
const ModalRooms = ({ setOpenModal }) => {

  const dispatch = useAppDispatch();
  const bookingData = useAppSelector((state) => state.booking);
  const { extendedProps } = bookingData;
  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(bookingActions.resetState());
  };

  const handleRemoveEvent = () => {
    /// To Do axios Remove Event by ID /////////////////////
    handleCloseModal();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!extendedProps.roomId) {
      if (!extendedProps.floor) {
        dispatch(bookingActions.setBookingError({ floor: Errors.floor }));
      }
      dispatch(bookingActions.setBookingError({ roomId: Errors.roomId }));
      return;
    }
  };
  return (
    <Modal data-testid="modal-1" closeModal={handleCloseModal}>
      <BookingForm
        handleSubmit={handleSubmit}
        handleRemoveEvent={handleRemoveEvent}
        edit={Boolean(bookingData.extendedProps.bookingId)}
      />
    </Modal>
  );
};

export default ModalRooms;
