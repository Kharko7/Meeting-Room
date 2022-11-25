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
import dayjs from "dayjs";
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
  const { bookingId, start, end } = useAppSelector((state) => state.booking);

  const floor = rooms.filter((el) => el.roomId == booking.room_FK);

  const handleEdit = () => {
    const invitations = booking.invitations.map((id:any)=>id.invitedId_FK)
    dispatch(
      editOwnBooking({
        title: booking.title,
        start:  dayjs.utc(booking.startDateTime).format("YYYY-MM-DDTHH:mm"),
        end:dayjs.utc(booking.endDateTime).format("YYYY-MM-DDTHH:mm") ,
        roomId: booking.room_FK,
        description: booking.description,
        bookingId: booking.bookingId,
        floor: floor[0].floor,
        isRecurring: booking.isRecurring,
        invitedId: invitations,
      })
    );
  };
  const handleDelete = () => {
    dispatch(setBookingId(booking.bookingId));
  };

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
            <svg
              className={styles.contSvg}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
            </svg>

            <span className={styles.time}>
              {booking.startDateTime.slice(11, 16)}

              {" | "}

              {dayjs(booking.startDateTime).format("DD MMMM YYYY")}

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
