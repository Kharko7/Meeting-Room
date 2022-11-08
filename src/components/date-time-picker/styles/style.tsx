import { SxProps } from "@mui/material";

export const popperSx: SxProps = {
  "& .MuiPickersCalendarHeader-switchViewButton": {
    width: "20px",
    height: "20px",
    margin: "0 5px 0 0",
  },
  "& .MuiIconButton-root": {
    backgroundColor: "var(--base1)",
    boxShadow:
        " var(--datePicker-box-shadow)",
    ":hover": {
      boxShadow:
          "var(--inset-input-shadow)",
    },
  },
  "& .MuiCalendarPicker-root, & .MuiDayPicker-header,& .MuiPickersDay-root": {
    color: "gray",
  },
  "& .MuiPaper-root": {
    backgroundColor: "var(--base1)",
    boxShadow:
        "var(--iconBtn-shadow)",
  },
  "& .MuiPickersDay-root,& .PrivatePickersYear-yearButton,& .PrivatePickersMonth-root":
    {
      backgroundColor: "var(--base1)",
      ":hover": {
        color: "var(--mainColorFont) !important",
        backgroundColor: "var(--base1)",
        boxShadow:
            "var(--inset-input-shadow)",
      },
    },
  "& .Mui-selected": {
    backgroundColor: "var(--base1) !important",
    color: "var(--mainColorFont) !important",
    boxShadow:
        "var(--inset-input-shadow)",  },
  "& .MuiPickersDay-today": {
    border: "none !important",
    color: "var(--dateAndTime-color)",
  },
};

export const Ico = () => <></>;