import React, { ChangeEvent } from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import styles from './bookingFormAdd.module.scss'
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import DateAndTimePicker from '../date-time-picker/DateAndTimePicker';
import SelectColor from '../selector/selector';

const cn = classNames.bind(styles);

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Dayjs | null | SelectChangeEvent<string>

interface BookingFormProps {
  data: any;
  handleSubmit: (event: any) => void;
  handleChangeData: (key: string) => (event: Event) => void;
}

const BookingFormAdd = ({ data, handleSubmit, handleChangeData }: BookingFormProps) => {

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        className={cn('form')}
      >
        <Box sx={{ mb: '20px' }}>
          <TextField
            type='text'
            autoFocus
            required
            placeholder="Title"
            fullWidth
            value={data.title}
            onChange={handleChangeData('title')}
          />
        </Box>
        <Box sx={{ mb: '20px' }} >
        </Box>
        <Box sx={{ mb: '20px', display: 'flex' }}>
          <DateAndTimePicker
            date={data.start}
            onChange={handleChangeData('start')}
            label="Start"
          />
          <DateAndTimePicker
            date={data.end}
            onChange={handleChangeData('end')}
            label="End"
          />
        </Box>
        <SelectColor pickedColor={data.backgroundColor} handleChangeData={handleChangeData} />
        <Box sx={{ textAlign: 'right' }}>
          <Button
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