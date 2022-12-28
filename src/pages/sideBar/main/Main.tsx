import { Box, CircularProgress, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks"
import {
  getOwnBookings,
  getOwnBookingsError,
  setPage,
  resetState as resetStateOwnBookings
} from "redux/slices/ownBookings.slice"
import {
  deleteBookingById,
  editBooking,
  editOneBooking,
  editRecurringBooking,
  resetState
} from "redux/slices/booking.slice"
import Card from "./card/Card"
import { Booking, Invitations } from "interfaces/OwnBookings"
import ModalPopup from "components/modal-popup"
import BookingForm from "components/booking-form"
import { snackbarVariants } from "constants/snackbar"
import { SnackBarContext } from "context/snackbar-context"

interface ChoosedBookingId {
  bookingId: number;
  recurringId: number | null;
}

const Main = () => {
  const dispatch = useAppDispatch()
  const { setAlert } = useContext(SnackBarContext)
  const { bookings, notification, totalCount, page, refreshOwnBookings } = useAppSelector(state => state.ownBookings)

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [choosedBookingId, setChoosedBookingId] = useState<ChoosedBookingId | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getOwnBookings({ page: 1 }))
    return () => {
      dispatch(resetStateOwnBookings())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, refreshOwnBookings])

  useEffect(() => {
    if (notification) {
      setAlert({
        severity: snackbarVariants.error,
        message: notification
      })
      dispatch(getOwnBookingsError(''));
    }
  }, [dispatch, notification, setAlert]);


  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetState());
    setChoosedBookingId(null)
  };
  const handleOpenModal = (booking: Booking) => {
    const invitedUserId = booking.invitations.length
      ? booking.invitations.map((userId: Invitations) => userId.invitedId_FK)
      : []
    const bookingEdit = {
      title: booking.title,
      start: booking.start,
      end: booking.end,
      description: booking.description,
      roomId: booking.roomId,
      bookingId: booking.bookingId,
      isRecurring: booking.isRecurring,
      recurringId: null,
      daysOfWeek: booking.daysOfWeek,
      invitedId: invitedUserId,
    }
    dispatch(editBooking(bookingEdit));
    setChoosedBookingId({ bookingId: booking.bookingId, recurringId: null })
    setOpenModal(true);
  };

  const handleSubmit = (values: any) => {
    const {
      title,
      description,
      selectRoom,
      iviteCoworkers,
      dateStart,
      dateEnd,
      selectDays,
    } = values

    const baseParams = {
      title: title,
      description: description,
      roomId: Number(selectRoom),
      invitations: iviteCoworkers,
    }
    const eventOneDay = {
      ...baseParams,
      startDateTime: dateStart,
      endDateTime: dateEnd,
    }
    const eventRecurring = {
      ...baseParams,
      startDate: dayjs(dateStart).format('YYYY-MM-DD'),
      startTime: dayjs(dateStart).format('HH:mm'),
      endDate: dayjs(dateEnd).format('YYYY-MM-DD'),
      endTime: dayjs(dateEnd).format('HH:mm'),
      daysOfWeek: selectDays.length ? selectDays.map((id: string) => Number(id)) : selectDays,
    }

    selectDays.length
      ? dispatch(editRecurringBooking({ ...eventRecurring, recurringId: choosedBookingId?.recurringId as number | null, }))
      : dispatch(editOneBooking({ ...eventOneDay, bookingId: choosedBookingId?.bookingId as number }))
    handleCloseModal();
  };

  const handleRemoveEvent = () => {
    if (choosedBookingId) {
      dispatch(deleteBookingById({
        id: choosedBookingId.recurringId
          ? choosedBookingId.recurringId
          : choosedBookingId.bookingId,
        isRecurring: Boolean(choosedBookingId.recurringId)
      }))
    }

    handleCloseModal();
  };

  const cards = bookings.map((booking: Booking) => (
    <Box
      key={booking.bookingId}
      sx={{ mb: '25px', cursor: 'pointer' }}
      onClick={() => handleOpenModal(booking)}
    >
      <Card
        title={booking.title}
        start={booking.start}
        end={booking.end}
      />
    </Box>
  ))
  const handleMoreData = () => {
    // if (cards.length === totalCount) {
    //   setHasMore(false)
    //   return
    // }
    dispatch(getOwnBookings({ page: page }))
    dispatch(setPage(page + 1))
  }

  return (
    <Box
      sx={{
        m: '10px 0 10px 0',
        overflow: 'auto',
      }}
    >
      <Typography
        component='h1'
        variant='h6'
        sx={{
          color: 'var(--primary-text-color)',
          textTransform: 'uppercase',
          mb: '20px'
        }}
      > My Bookings
      </Typography>
      <InfiniteScroll
        dataLength={cards.length}
        next={handleMoreData}
        hasMore={hasMore}
        loader={
          <Box sx={{ textAlign: 'center', height: '70px' }}>
            <CircularProgress size={40} />
          </Box>
        }
        height='660px'
        scrollThreshold={0.99}
        endMessage={<p>You do not have more bookings</p>}
      >
        {cards}
      </InfiniteScroll>
      <ModalPopup
        open={openModal}
        onClose={handleCloseModal}
      >
        <BookingForm
          handleSubmit={handleSubmit}
          handleRemoveEvent={handleRemoveEvent}
          edit={true}
        />
      </ModalPopup>
    </Box >
  )
}

export default Main