import { Box, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks"
import React, { useContext, useEffect, useState } from "react"

import { Rooms } from "interfaces/Rooms"
import ModalPopup from "components/modal-popup"
import BookingForm from "components/booking-form"
import { getRooms, setNotification } from "redux/slices/room.slice"
import { addOneBooking, addRecurringBooking, resetState, setBookingError, setRoomId } from "redux/slices/booking.slice"
import Header from "./header/Header"
import RoomCard from "./room-card/RoomCard"
import { setEventBooking } from "utils/set-event-submit"
import { FormValues } from "interfaces/Booking"
import { snackbarVariants } from "constants/snackbar"
import { SnackBarContext } from "context/snackbar-context"

const Room = () => {
  const dispatch = useAppDispatch()

  const { setAlert } = useContext(SnackBarContext)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showFloors, setShowFloors] = useState<number[]>([]);
  const { floors, rooms, notification } = useAppSelector(state => state.room)
  const { errors } = useAppSelector(state => state.booking);

  const handleShowFloors = (floor: number[]) => {
    setShowFloors(floor)
  }

  useEffect(() => {
    if (floors.length) {
      handleShowFloors(floors)
      return
    }
    dispatch(getRooms())
  }, [dispatch, floors])

  useEffect(() => {
    if (notification) {
      setAlert({
        severity: snackbarVariants.error,
        message: notification
      })
      dispatch(setNotification(''));
    }
    if (errors.errorMsg) {
      setAlert({
        severity: snackbarVariants.error,
        message: errors.errorMsg
      })
      dispatch(setBookingError({ errorMsg: '' }));
    }
  }, [dispatch, notification, setAlert, errors.errorMsg]);

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetState());
  };

  const handleOpenModal = (id: number) => {
    setOpenModal(true);
    dispatch(setRoomId(id));
  };

  const handleSubmit = (values: FormValues) => {
    const { selectDays } = values
    const { eventOneDay, eventRecurring } = setEventBooking(values)

    if (selectDays !== null && selectDays.length) {
      dispatch(addRecurringBooking(eventRecurring))
    } else {
      dispatch(addOneBooking(eventOneDay))
    }

    handleCloseModal();
  };

  const showRoomsByFloor = showFloors.map((floor: number) => {
    const cards = rooms[floor].map((room: Rooms) => {
      return (
        <React.Fragment key={room.roomId}>
          <RoomCard
            onClick={handleOpenModal}
            title={room.name}
            roomId={room.roomId}
            capacity={room.capacity}
            devices={room.devices}
          />
        </React.Fragment>
      )
    })

    return (
      <Box
        key={floor}
        sx={{
          mb: '40px',
          p: '30px',
          boxShadow: 'var(--inset-input-shadow)',
          backgroundColor: 'var(--calendar-bg)',
          borderRadius: '15px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: "20px",
            color: "var(--accent-text-color)",
          }}
        >
          {`FLOOR ${floor}`}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
          }}
        >
          {cards}
        </Box>
      </Box>
    )
  })

  return (
    <Box
      sx={{
        p: '0 30px 15px 30px',
      }}>
      <Header
        floors={floors}
        showFloors={showFloors}
        handleShowFloors={handleShowFloors}
      />
      {showRoomsByFloor}
      <ModalPopup
        open={openModal}
        onClose={handleCloseModal}
      >
        <BookingForm
          handleSubmit={handleSubmit}
          edit={false}
        />
      </ModalPopup>
    </Box>

  )
}

export default Room