import { SxProps } from "@mui/material";

export const popperSx: SxProps = {
  "& .MuiPickersCalendarHeader-switchViewButton": {
    width: "20px",
    height: "20px",
    margin: "0 5px 0 0",
  },
  "& .MuiIconButton-root": {
    backgroundColor: "#f4f6fa",
    boxShadow:
      " -2px -2px 5px rgba(255, 255, 255, 0.8),  -2px -2px 5px rgba(255, 255, 255, 0.625), 2px 2px 2px rgba(0, 0, 0, 0.15),inset 2px 2px 5px rgba(255, 255, 255, 0.1)",
    ":hover": {
      boxShadow:
        "inset -2px -2px 5px rgba(255, 255, 255, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.625),inset 2px 2px 2px rgba(0, 0, 0, 0.15),inset 2px 2px 5px rgba(255, 255, 255, 0.1)",
    },
  },
  "& .MuiCalendarPicker-root, & .MuiDayPicker-header,& .MuiPickersDay-root": {
    color: "gray",
  },
  "& .MuiPaper-root": {
    backgroundColor: "#f4f6fa",
    boxShadow:
      "-4px -4px 10px rgba(255, 255, 255, 0.8), -4px -4px 10px rgba(255, 255, 255, 0.625), 4px 4px 4px rgba(0, 0, 0, 0.15), inset 4px 4px 10px rgba(255, 255, 255, 0.1)",
  },
  "& .MuiPickersDay-root,& .PrivatePickersYear-yearButton,& .PrivatePickersMonth-root":
    {
      backgroundColor: "#f4f6fa",
      ":hover": {
        color: "#a8a8a8 !important",
        backgroundColor: "#f4f6fa",
        boxShadow:
          "inset -2px -2px 5px rgba(255, 255, 255, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.625),inset 2px 2px 2px rgba(0, 0, 0, 0.15),inset 2px 2px 5px rgba(255, 255, 255, 0.1)",
      },
    },
  "& .Mui-selected": {
    backgroundColor: "#f4f6fa !important",
    color: "#a8a8a8 !important",
    boxShadow:
      "inset -2px -2px 5px rgba(255, 255, 255, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.625),inset 2px 2px 2px rgba(0, 0, 0, 0.15),inset 2px 2px 5px rgba(255, 255, 255, 0.1)",
  },
  "& .MuiPickersDay-today": {
    border: "none !important",
    color: "#25cee0",
  },
};

export const Ico = () => <></>;