import React from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import styles from './bookingFormAdd.module.scss'
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { EventInput } from '@fullcalendar/react';
import DateAndTimePicker from 'components/date-time-picker/DateAndTimePicker';
import ColorSelector from '../color-selector/ColorSelector';
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundColor, setEnd, setStart, setTitle, setBookingError } from 'redux/booking/booking.actions';

const cn = classNames.bind(styles);
interface BookingFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const BookingFormAdd = ({ handleSubmit }: BookingFormProps) => {

  const dispatch = useDispatch();
  const { title, start, end, backgroundColor, errors } = useSelector(({ Booking }: EventInput) => ({
    title: Booking.title,
    start: Booking.start,
    end: Booking.end,
    backgroundColor: Booking.backgroundColor,
    errors: Booking.errors,
  }));

  const handleChangeStart = (event: Dayjs | null) => {
    if (event?.isValid()) {
      dispatch(setStart(event.toISOString()))
      dispatch(setBookingError({ start: '', }))
    } else {
      dispatch(setBookingError({
        start: 'Date not valid',
      }))
    }
  }
  const handleChangeEnd = (event: Dayjs | null) => {
    if (event?.isValid()) {
      dispatch(setEnd(event.toISOString()))
      dispatch(setBookingError({ end: '', }))
    } else {
      dispatch(setBookingError({
        end: 'Date not valid',
      }))
    }
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        className={cn('form')}
      >
        <Box sx={{ mb: '20px', height: '80px' }}>
          <TextField
            type='text'
            autoFocus
            required
            placeholder="Text"
            fullWidth
            value={title}
            onChange={event => dispatch(setTitle(event.target.value))}
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
            errorMsg={errors?.end}
            onChange={handleChangeEnd}
            label="End" />
        </Box>
        <ColorSelector pickedColor={backgroundColor} onChange={event => dispatch(setBackgroundColor(event.target.value))} />
        <Box sx={{ textAlign: 'right' }}>
          <Button
            disabled={Boolean(Object.values(errors).join(''))}
            size='large' type='submit'
            variant='contained'
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default BookingFormAdd