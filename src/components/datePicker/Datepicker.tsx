import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Ico,popperSx } from "./styles/Styles";
import "./styles/styles.scss";
const DatePickerComponent = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  //@ts-ignore
  console.log(value?.$D);

  return (
   
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          components={{ OpenPickerIcon: Ico }}
          open={open}
          OpenPickerButtonProps={{ disableRipple: true }}
          onOpen={() => setOpen((prev) => !prev)}
          label=""
          openTo="day"
          views={["year", "month", "day"]}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params}/>}
          PopperProps={{ sx: popperSx }}
        />
      </LocalizationProvider>

  );
};

export default DatePickerComponent;
