import React, { useState } from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import DateAndTimePicker from 'components/date-time-picker';
import Button from 'components/button';
import ConfirmDialog from 'components/confirm-dialog';
import { Errors } from 'constants/errors';
import { useAppDispatch, useAppSelector } from 'hooks/toolkitHooks';
import { bookingActions } from 'redux&saga/slices/booking.slice';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import InviteCoworkers from './invite-coworkers/InviteCoworkers';
import Selector from './selector/Selector';
import { SelectChangeEvent } from '@mui/material/Select';
import { rooms } from 'configs/rooms';
import MenuItem from '@mui/material/MenuItem';
import { daysOfWeek, floors } from 'constants/booking-form';
import SelectorMultiple from './selector/SelectorMultiple';

interface BookingFormProps {
  edit: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveEvent: () => void;
}

const BookingForm = ({ edit, handleSubmit, handleRemoveEvent }: BookingFormProps) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  const { title, extendedProps, start, end } = useAppSelector(state => state.booking);
  const handleChangeStart = (event: Dayjs | null) => {
    if (event !== null) {
      dispatch(bookingActions.setStart(event.format('YYYY-MM-DDTHH:mm')))
    }
  }
  const handleChangeEnd = (event: Dayjs | null) => {
    if (event !== null) {
      dispatch(bookingActions.setEnd(event.format('YYYY-MM-DDTHH:mm')))
    }
  }

  const onConfirm = () => {
    handleRemoveEvent()
    setOpenConfirmation(false)
  }
  const onDismiss = () => {
    setOpenConfirmation(false)
  }

  const handleBlur = () => {
    if (title.trim().length > 20 || title.trim().length === 0) {
      dispatch(bookingActions.setBookingError({ title: Errors.titleLength }))
    } else dispatch(bookingActions.setBookingError({ title: '' }))
  }

  const handleChangeRoom = (e: SelectChangeEvent<string>) => {
    dispatch(bookingActions.setRoomId(Number(e.target.value)))
    dispatch(bookingActions.setBookingError({ roomId: '' }))
  }
  const handleChangeFloor = (e: SelectChangeEvent<string>) => {
    dispatch(bookingActions.setFloor(e.target.value))
    dispatch(bookingActions.setRoomId(null))
    dispatch(bookingActions.setBookingError({ floor: '' }))
  }
  const handleChangeWeek = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value
    dispatch(bookingActions.setDaysOfWeek(typeof value === 'string' ? value.split(',') : value))
  }

  const roomsByFloor = rooms.filter((room) => {
    return room.floor === Number(extendedProps.floor)
  })
  const menuItemsRoom = roomsByFloor.map(room => (
    <MenuItem
      key={room.roomId}
      value={room.roomId}>
      {room.name}
    </MenuItem>
  ))
  const menuItemsFloor = floors.map(floor => (
    <MenuItem
      key={floor}
      value={floor}>
      {floor}
    </MenuItem>
  ))

  return (
    <>
      <Typography
        variant='h3'
        sx={{ mb: '20px', textAlign: 'center', color: 'var(--accent-text-color)' }}>
        Booking
      </Typography>
      <Box
        sx={{ displa: 'flex', flexDirection: 'column', p: '20px' }}
        component='form'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <Grid container maxWidth={1000} spacing={3} >
          <Grid item xs={6}>
            <Box sx={{ mb: '25px', height: '75px', minWidth: '280px' }}>
              <TextField
                error={Boolean(extendedProps.errors.title)}
                autoFocus
                label="Title"
                fullWidth
                value={title}
                onBlur={handleBlur}
                onChange={event => dispatch(bookingActions.setTitle(event.target.value))}
                helperText={extendedProps.errors.title ? extendedProps.errors.title : ''}
              />
            </Box>
            <Box sx={{ mb: '40px' }}>
              <TextField
                value={extendedProps.description}
                onChange={event => dispatch(bookingActions.setDescription(event.target.value))}
                label="Description"
                fullWidth
                multiline
                maxRows={3}
              />
            </Box>
            <Box sx={{ mb: '20px', display: 'flex', gap: '15px', height: '80px' }}>
              <Selector
                label='Choose floor'
                value={extendedProps.floor || ''}
                errorMsg={extendedProps.errors?.floor}
                menuItems={menuItemsFloor}
                onChange={handleChangeFloor} />
              <Selector
                label='Choose room'
                value={extendedProps.roomId?.toString() || ''}
                errorMsg={extendedProps.errors?.roomId}
                disabled={!extendedProps.floor}
                menuItems={menuItemsRoom}
                onChange={handleChangeRoom} />
            </Box>
            <Box sx={{ mb: '40px', display: 'flex', gap: '15px' }}>
              <DateAndTimePicker
                date={start}
                errorMsg={extendedProps.errors?.start}
                onChange={handleChangeStart}
                label="Start"
              />
              <DateAndTimePicker
                date={end}
                minDate={start}
                errorMsg={extendedProps.errors?.end}
                onChange={handleChangeEnd}
                label="End" />
            </Box>
            <SelectorMultiple
              value={extendedProps.daysOfWeek}
              label='Days of week'
              daysOfWeek={daysOfWeek}
              onChange={handleChangeWeek} />
          </Grid>
          <Grid item xs={6}>
            <InviteCoworkers />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
              {extendedProps.roomId &&
                <Button
                  type='button'
                  onclick={() => setOpenConfirmation(true)}
                >
                  Delete
                </Button>
              }
              <Button
                disabled={Boolean(Object.values(extendedProps.errors).join(''))}
                type='submit'
                onclick={() => { }}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ConfirmDialog open={openConfirmation} message='Do you want to delete event' onConfirm={onConfirm} onDismiss={onDismiss} />
    </>
  );
}

export default BookingForm