import { useState } from "react";
import ActionButton from "../../../../components/icon-button/IconButton";
import styles from "../SideBar.module.scss";
import stylesModal from "./modal.module.scss";
import Modal from "../../../../components/modal/Modal";
import Button from "../../../../components/button";
import BookingForm from "components/booking-form";
import React from "react";
import { getFromLocalStorage } from "services/local-storage.service";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
// import { bookingActions } from "redux&saga/slices/booking.slice";
import { Errors } from "constants/errors";
import Loader from 'pages/layout/loader/Loader'
const OwnBookings = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  //
  const dispatch = useAppDispatch();
  const ownBookingsData = useAppSelector((state) => state.ownBookings.bookings);
  const bookingData = useAppSelector((state) => state.booking);

  // const { extendedProps } = bookingData;
  // const handleCloseModal = () => {
  //   setOpenModal(false);
  //   dispatch(bookingActions.resetState());
  // };

  // const handleRemoveEvent = () => {
  //   /// To Do axios Remove Event by ID /////////////////////
  //   handleCloseModal();
  // };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!extendedProps.roomId) {
  //     if (!extendedProps.floor) {
  //       dispatch(bookingActions.setBookingError({ floor: Errors.floor }));
  //     }
  //     dispatch(bookingActions.setBookingError({ roomId: Errors.roomId }));
  //     return;
  //   }
  // };
  return (
    <>
   

        {ownBookingsData.map((_, index: number) => (
          <div className={styles.roomCardContainer} key={index}>
            <div className={styles.headerRoomCard}>
              <span className={styles.labelRoomName}>
                {ownBookingsData[index].title}
              </span>

              <span>
                <ActionButton
                  size="small"
                  type="edit"
                  onclick={() => setOpenModal(true)}
                />
                <ActionButton
                  mg={true}
                  size="small"
                  type="delete"
                  onclick={() => setOpenDelete(true)}
                />
              </span>
            </div>
            {ownBookingsData[index].description !== "" && (
              <span className={styles.labelDescription}>
                {ownBookingsData[index].description}
              </span>
            )}
            <div className={styles.labelTime}>
              <span className={styles.labelTimeHeading}>
                Start:
                {"  "}
                <span className={styles.time}>
                  {ownBookingsData[index].startDateTime.slice(11, 16)}
                  {"  "}
                  {ownBookingsData[index].startDateTime.slice(0, 10)}
                  {/* {ownBookingsData[index].endDateTime.slice(11, 16)} */}
                </span>
              </span>
            </div>
          </div>
        ))}

      {/* {openModal && (
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingData.extendedProps.bookingId)}
          />
        </Modal>
      )} */}
      {openDelete && (
        <Modal closeModal={setOpenDelete}>
          <form>
            <h1 className={stylesModal.modalh1}>Delete?</h1>
            <p className={stylesModal.modalp}>
              Are you sure you want to delete this booking?
            </p>
            <div className={stylesModal.modalDeleteButtons}>
              <Button type="submit" styleType="error" onclick={() => {}}>
                Accept
              </Button>
              <Button type="submit" onclick={() => {}}>
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
