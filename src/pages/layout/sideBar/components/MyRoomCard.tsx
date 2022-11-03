import { useState } from "react";
import ActionButton from "../../../../components/icon-button/IconButton";
import styles from "../SideBar.module.scss";
import stylesModal from "./modal.module.scss";
import Modal from "../../../../components/modal/Modal";
import Button from "../../../../components/button";
import BookingForm from "components/booking-form";

import { Box } from "@mui/material";
import React from "react";
import { EventInput } from "@fullcalendar/react";

import { INITIAL_EVENTS } from "configs/initial-events";
import { getFromLocalStorage } from "services/local-storage.service";

import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import { bookingActions } from "redux&saga/slices/booking.slice";

import { Errors } from "constants/errors";
interface Data {
  mockedData: Array<MyroomsData>;
}
interface MyroomsData {
  name: string;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
  date: string;
  endTime: string;
  startTime: string;
}
const MyRoomCard = ({ mockedData }: Data) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const weekends = getFromLocalStorage("weekends");
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
    <>
      {mockedData.map((_, index) => (
        <div className={styles.roomCardContainer} key={index}>
          <div className={styles.headerRoomCard}>
            <span className={styles.labelRoomName}>
              {mockedData[index].name}
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

          <div className={styles.labelTime}>
            {mockedData[index].date}
            {"  "}
            {mockedData[index].startTime}
            {" - "}
            {mockedData[index].endTime}
          </div>

          <div className={styles.roomInfo}>
            {mockedData[index].equipment.projector ? (
              <div className={styles.projectorIco}></div>
            ) : (
              <></>
            )}
            {mockedData[index].equipment.TV ? (
              <div className={styles.tvIco}></div>
            ) : (
              <></>
            )}
            <span className={styles.capacityLabel}>
              {mockedData[index].capacity}
              <div className={styles.membersIco}></div>
            </span>
          </div>
        </div>
      ))}

      {openModal && (
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingData.extendedProps.bookingId)}
          />
        </Modal>
      )}
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

export default MyRoomCard;
