import styles from './dateAndTimePicker.module.scss'
import classNames from 'classnames/bind';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { SxProps } from "@mui/system"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const cn = classNames.bind(styles);
interface DateAndTimePickerProps {
  date: Dayjs | null;
  label: string;
  onChange: (event: Dayjs | null) => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({ date, label, onChange }) => {

  const popperSx: SxProps = {
    "& .MuiPaper-root": {
      backgroundColor: '#f2f3f7',
      boxShadow: '-1px -3px 12px 0px rgb(255 255 255 / 45%), 4px 3px 8px 1px rgb(166 166 166)'
    },
    "&.MuiPickersPopper-root": {
      left: '25px!important',
    },
    "& .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root": {
      backgroundColor: 'transparent',
      "&:hover": {
        boxShadow: 'inset -3px -3px 0px 0px rgb(255 255 255 / 45%), inset 3px 1.5px 3px 0px rgb(191 191 191)',
        color: '#898989',
        backgroundColor: 'transparent',
      }
    },
    "& .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
      backgroundColor: 'transparent!important',
      boxShadow: 'inset -3px -3px 0px 0px rgb(255 255 255 / 45%), inset 3px 1.5px 3px 0px rgb(191 191 191)',
      color: '#898989',
    },
    "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
      border: 'none',
      backgroundColor: '#e1e1e1',
      color: '#25cee0',
    }
  };

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
          PopperProps={{
            sx: popperSx
          }}
          renderInput={(params) => (
            <TextField
              {...params}
            />)}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateAndTimePicker;



