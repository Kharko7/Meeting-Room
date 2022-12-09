import './styles/dateAndTimePicker.module.scss'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Ico, popperSx } from "./styles/style";
interface DateAndTimePickerProps {
  date: string;
  label?: string;
  errorMsg: string;
  minDate?: string;
  onChange: (value: string) => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({ errorMsg, label = '', minDate, date, onChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        components={{ OpenPickerIcon: Ico }}
        dayOfWeekFormatter={day => day.charAt(0).toUpperCase() + day.charAt(1)}
        inputFormat="DD/MM/YYYY hh:mm A"
        value={date}
        onChange={(e) => e !== null && onChange(e.format("YYYY-MM-DDTHH:mm"))}
        label={label}
        minDateTime={minDate ? dayjs(minDate).add(15, 'minute') : undefined}
        minutesStep={15}
        PopperProps={{ sx: popperSx, placement: "top-start", }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& .MuiFormLabel-root[data-shrink="true"]': {
                top: ' -11px',
                fontSize: '20px',
                left: ' 9px',
                color: 'var(--label)',
              }
            }}
            onKeyDown={(e) => e.preventDefault()}
            error={Boolean(errorMsg)}
            helperText={errorMsg}
          />)}
      />
    </LocalizationProvider>
  );
};

export default DateAndTimePicker;



