import { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Ico, popperSx } from "./styles/Styles";
import { DateInput } from '@fullcalendar/react';
import { Dayjs } from 'dayjs';
import "./styles/styles.module.scss";

interface DateAndTimePickerProps {
  date: DateInput | undefined;
  label: string;
  errorMsg: string;
  onChange: (event: Dayjs | null) => void;
}

const DatePickerComponent = ({ date, label, errorMsg, onChange }: DateAndTimePickerProps) => {
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  //@ts-ignore
  //console.log(value?.$D);

  console.log(date)

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        components={{ OpenPickerIcon: Ico }}
        // open={open}
        // OpenPickerButtonProps={{ disableRipple: true }}
        // onOpen={() => setOpen((prev) => !prev)}
        dayOfWeekFormatter={day => day.charAt(0).toUpperCase() + day.charAt(1)}
        openTo="day"
        inputFormat="DD/MM/YYYY"
        views={["year", "month", "day"]}
        value={date}
        label={label}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(errorMsg)}
            helperText={errorMsg ? errorMsg : ''}
          />)}
        PopperProps={{ sx: popperSx }}
      />
    </LocalizationProvider>

  );
};

export default DatePickerComponent;
