import { useState } from "react";
import ActionButton from "../../../../components/icon-button/IconButton";
import styles from "../SideBar.module.scss";
import stylesModal from "./modal.module.scss";
import Modal from "../../../../components/modal/Modal";
import Button from "../../../../components/button";
import BookingForm from "components/booking-form";
import React, { useEffect } from "react";
import { getFromLocalStorage } from "services/local-storage.service";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
// import { bookingActions } from "redux&saga/slices/booking.slice";

import {
  addOneBooking,
  addRecurringBooking,
  editBooking,
  getAllBookings,
  resetState,
  setBookingId,
  editOwnBooking,
  deleteBookingById,
  setBookingError,
  setSelectedDate,
} from "redux&saga/slices/booking.slice";
import ModalOwnRooms from "./ModalOwnBookings";
import Loader from "pages/layout/loader/Loader";
//@ts-ignore
const OwnBookings = ({ booking, index }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { roomsByFloor, floors, filter, rooms, statuses } = useAppSelector(
    (state) => state.rooms
  );
  const { bookingId } = useAppSelector((state) => state.booking);

  const floor = rooms.filter((el) => el.roomId == booking.room_FK);
  const handleEdit = () => {
    dispatch(
      editOwnBooking({
        title: booking.title,
        start: booking.startDateTime,
        end: booking.endDateTime,
        roomId: booking.room_FK,
        description: booking.description,
        bookingId: booking.bookingId,
        floor: floor[0].floor,
        isRecurring: booking.isRecurring,
      })
    );
  };
  const handleDelete = () =>{
    dispatch(setBookingId(booking.bookingId));
  }

      const handleCloseModal = () => {
        setOpenDelete(false);
        dispatch(resetState());
      };
  
  const handleRemoveEvent = () => {
    if (bookingId) {
      dispatch(
        deleteBookingById({
          id: bookingId,
          isRecurring: false,
        })
      );
    }
    setOpenDelete(false);
  };
  return (
    <>
      <div className={styles.roomCardContainer} key={index}>
        <div className={styles.headerRoomCard}>
          <span className={styles.labelRoomName}>{booking.title}</span>

          <span>
            <ActionButton
              size="small"
              type="edit"
              onclick={() => {
                setOpenEdit(true);
                handleEdit();
              }}
            />
            <ActionButton
              mg={true}
              size="small"
              type="delete"
              onclick={() => {
                setOpenDelete(true);
                handleDelete();
              }}
            />
          </span>
        </div>
        {booking.description !== "" && (
          <span className={styles.labelDescription}>{booking.description}</span>
        )}
        <div className={styles.labelTime}>
          <span className={styles.labelTimeHeading}>
            Start:
            {"  "}
            <span className={styles.time}>
              {booking.startDateTime.slice(11, 16)}
              {"  "}
              {booking.startDateTime.slice(0, 10)}
              {/* {booking.endDateTime.slice(11, 16)} */}
            </span>
          </span>
        </div>
      </div>

      {/* {openModal && (
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingData.extendedProps.bookingId)}
          />
        </Modal>
      )} */}
      {openEdit && (
        <ModalOwnRooms booking={booking} setOpenModal={setOpenEdit} />
      )}
      {openDelete && (
        <Modal closeModal={handleCloseModal}>
          <form>
            <h1 className={stylesModal.modalh1}>Delete?</h1>
            <p className={stylesModal.modalp}>
              Are you sure you want to delete this booking?
            </p>
            <div className={stylesModal.modalDeleteButtons}>
              <Button
                type="submit"
                styleType="error"
                onclick={() => handleRemoveEvent()}
              >
                Accept
              </Button>
              <Button type="submit" onclick={() => handleCloseModal()}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default OwnBookings;
