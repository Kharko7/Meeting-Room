import React, { useState } from 'react'
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import styles from './bookingForm.module.scss'
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { EventInput } from '@fullcalendar/react';
import DateAndTimePicker from 'components/date-time-picker';
import ColorSelector from '../color-selector/ColorSelector';
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundColor, setEnd, setStart, setTitle, setBookingError, setDescription } from 'redux/booking/booking.actions';
import Button from 'components/button';
import ConfirmDialog from 'components/confirm-dialog';
import { Errors } from 'constants/errors';

const cn = classNames.bind(styles);
interface BookingFormProps {
  edit: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveEvent: () => void;
}

const BookingForm = ({ edit, handleSubmit, handleRemoveEvent }: BookingFormProps) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
  const dispatch = useDispatch();

  const { title, description, start, end, backgroundColor, errors } = useSelector(({ Booking }: EventInput) => ({
    title: Booking.title,
    description: Booking.description,
    start: Booking.start,
    end: Booking.end,
    backgroundColor: Booking.backgroundColor,
    errors: Booking.errors,
  }));

  const handleChangeStart = (event: Dayjs | null) => {
    dispatch(setStart(event?.toISOString()))
  }
  const handleChangeEnd = (event: Dayjs | null) => {
    dispatch(setEnd(event?.toISOString()))
  }

  const onConfirm = () => {
    handleRemoveEvent()
    setOpenConfirmation(false)
  }
  const onDismiss = () => {
    setOpenConfirmation(false)
  }

  const handleBlur = () => {
    if (title.length > 20) {
      dispatch(setBookingError({ title: Errors.titleLength }))
    } else dispatch(setBookingError({ title: '' }))
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        className={cn('form')}
        autoComplete='off'
      >
        <Box sx={{ mb: '20px', height: '75px' }}>
          <TextField
            error={Boolean(errors.title)}
            autoFocus
            required
            label="Title"
            fullWidth
            value={title}
            onBlur={handleBlur}
            onChange={event => dispatch(setTitle(event.target.value))}
            helperText={errors.title ? errors.title : ''}
          />
        </Box>
        <Box sx={{ mb: '40px' }}>
          <TextField
            value={description}
            onChange={event => dispatch(setDescription(event.target.value))}
            label="Description"
            fullWidth
            multiline
            maxRows={3}
          />
        </Box>
        <Box sx={{ mb: '20px', height: '80px' }}>
          <DateAndTimePicker
            date={start}
            errorMsg={errors?.start}
            onChange={handleChangeStart}
            label="Start"
          />
        </Box>
        <Box sx={{ mb: '20px', height: '80px' }}>
          <DateAndTimePicker
            date={end}
            minDate={start}
            errorMsg={errors?.end}
            onChange={handleChangeEnd}
            label="End" />
        </Box>
        <ColorSelector pickedColor={backgroundColor} onChange={event => dispatch(setBackgroundColor(event.target.value))} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {edit &&
            <Box sx={{ marginRight: '20px' }}>
              <Button
                type='button'
                onclick={() => setOpenConfirmation(true)}
              >
                Delete
              </Button>
            </Box>}
          <Button
            disabled={Boolean(Object.values(errors).join(''))}
            type='submit'
            onclick={() => { }}
          >
            Save
          </Button>
        </Box>
      </Box>
      <ConfirmDialog open={openConfirmation} message='Do you want to delete event' onConfirm={onConfirm} onDismiss={onDismiss} />
    </>
  );
}

export default BookingForm