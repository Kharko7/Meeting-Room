import styles from './dateAndTimePicker.module.scss'
import classNames from 'classnames/bind';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateInput } from '@fullcalendar/react';

const cn = classNames.bind(styles);
interface DateAndTimePickerProps {
  date: DateInput | undefined;
  label: string;
  errorMsg: string;
  onChange: (event: Dayjs | null) => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({ date, label, errorMsg, onChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack className={cn('datePickerBorder')}>
        <DateTimePicker
          className={cn('datePicker')}
          dayOfWeekFormatter={day => day.charAt(0).toUpperCase() + day.charAt(1)}
          inputFormat="DD/MM/YYYY hh:mm A"
          value={date}
          label={label}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(errorMsg)}
              helperText={errorMsg ? errorMsg : ''}
            />)}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateAndTimePicker;



