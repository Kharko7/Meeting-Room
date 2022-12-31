import { Box, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks"
import React, { useEffect, useState } from "react"

import { Rooms } from "interfaces/Rooms"
import ModalPopup from "components/modal-popup"
import BookingForm from "components/booking-form"
import { getRooms } from "redux/slices/room.slice"
import { addOneBooking, addRecurringBooking, resetState, setRoomId } from "redux/slices/booking.slice"
import Header from "./header/Header"
import RoomCard from "./room-card/RoomCard"
import { setEventBooking } from "utils/set-event-submit"
import { FormValues } from "interfaces/Booking"

const Room = () => {
  const dispatch = useAppDispatch()

  const [openModal, setOpenModal] = useState<boolean>(false);
  const { floors, rooms } = useAppSelector(state => state.room)

  useEffect(() => {
    if (floors.length) {
      return
    }
    dispatch(getRooms())
  }, [dispatch])

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

  const showRoomsByFloor = floors.map((floor: number) => {

    const cards = rooms[floor].map((room: Rooms) => {
      return (
        <React.Fragment key={room.roomId}>
          <RoomCard
            onClick={handleOpenModal}
            title={room.name}
            roomId={room.roomId}
            floor={room.floor}
            capacity={room.capacity}
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
        p: '15px 30px',
      }}>
      <Header />
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