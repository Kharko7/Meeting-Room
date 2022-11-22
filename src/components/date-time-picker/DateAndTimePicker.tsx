import './styles/dateAndTimePicker.module.scss'
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Ico, popperSx } from "./styles/style";
interface DateAndTimePickerProps {
  date: string;
  label?: string;
  errorMsg?: string;
  minDate?: string;
  onChange: (event: Dayjs | null) => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({ date, label = '', errorMsg = '', minDate, onChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        components={{ OpenPickerIcon: Ico }}
        dayOfWeekFormatter={day => day.charAt(0).toUpperCase() + day.charAt(1)}
        inputFormat="DD/MM/YYYY hh:mm A"
        value={date}
        label={label}
        onChange={onChange}
        minDateTime={minDate ? dayjs(minDate) : undefined}
        minutesStep={15}
        PopperProps={{ sx: popperSx, placement: "top-start", }}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyDown={(e) => e.preventDefault()}
            error={Boolean(errorMsg)}
            helperText={errorMsg ? errorMsg : ''}
          />)}
      />
    </LocalizationProvider>
  );
};

export default DateAndTimePicker;



