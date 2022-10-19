import React, { ChangeEvent } from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import styles from './bookingFormAdd.module.scss'
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectColor from '../selector/selector';
import { EventInput } from '@fullcalendar/react'
import DatePicker from 'components/datePicker';

const cn = classNames.bind(styles);

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Dayjs | null | SelectChangeEvent<string>

interface BookingFormProps {
  data: EventInput;
  errors: Record<string, string>;
  handleSubmit: (event: any) => void;
  handleChangeData: (key: string) => (event: Event) => void;
  debouncechange: any;
}

const BookingFormAdd = ({ data, errors, handleSubmit, handleChangeData, debouncechange }: BookingFormProps) => {

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
            placeholder="Text"
            fullWidth
            value={data.title}
            onChange={handleChangeData('title')}
          />
        </Box>
        <Box sx={{ mb: '20px' }} >
        </Box>
        <Box sx={{ mb: '20px', display: 'flex' }}>
          <DatePicker
            date={data.start}
            errorMsg={errors?.start}
            onChange={handleChangeData('start')}
            label="Start"
          />
          <DatePicker
            date={data.end}
            errorMsg={errors?.end}
            onChange={handleChangeData('end')}
            label="End"
          />
        </Box>
        <SelectColor pickedColor={data.backgroundColor} handleChangeData={handleChangeData} />
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