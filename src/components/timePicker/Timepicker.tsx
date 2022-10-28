import { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "./styles/styles.module.scss";

const TimePickerComponent = ({}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const Ico = () => <></>;
  return (

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          components={{ OpenPickerIcon: Ico }}
          open={open}
          OpenPickerButtonProps={{ disableRipple: true }}
          onOpen={() => setOpen((prev) => !prev)}
          label=""
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
  
  );
};

export default TimePickerComponent;
