export const styles = {
  input: {
    '& .MuiFormLabel-root[data-shrink="true"]': {
      fontSize: ' 20px',
      top: '-11px',
      left: '9px',
      color: 'var(--label)',
    },
    '& .MuiFormLabel-root[data-shrink="false"]': {
      left: '10px',
      color: 'var(--mainColorFont)'
    },
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        pl: '23px',
      },
      '& fieldset': {
        border: '0px solid var(--PickerGlobalColor)!important',
        borderRadius: '100px',
        boxShadow: 'var(--inset-input-shadow)',
      },
    },
  },
  popperSx: {
    '& .MuiPickersArrowSwitcher-button': {
      width: '25px',
      height: '25px',
    },
    "& .MuiPickersCalendarHeader-switchViewButton": {
      width: "20px",
      height: "20px",
      margin: "0 5px 0 0",
    },
    "& .MuiIconButton-root": {
      backgroundColor: "var(--base1)",
      boxShadow: "var(--datePicker-box-shadow)",
    },
    "& .MuiCalendarPicker-root, & .MuiDayPicker-header,& .MuiPickersDay-root": {
      color: "gray",
    },
    "& .MuiPaper-root": {
      backgroundColor: "var(--base1)",
      boxShadow:
        "var(--iconBtn-shadow)",
    },
    "& .MuiPickersDay-root, & .PrivatePickersMonth-root": {
      backgroundColor: "var(--base1)",
      ":hover": {
        color: "var(--mainColorFont) !important",
        backgroundColor: "var(--base1)",
        boxShadow:
          "var(--inset-input-shadow)",
      },
    },
    '& .PrivatePickersYear-yearButton': {
      textAlign: 'center'
    },
    "& .Mui-selected": {
      backgroundColor: "var(--base1) !important",
      color: "var(--mainColorFont) !important",
      boxShadow:
        "var(--inset-input-shadow)",
    },
    "& .MuiPickersDay-today": {
      border: "none !important",
      color: "var(--dateAndTime-color)",
    },
    //////// Clock Time ///////
    '& .MuiClock-root': {
      '& .css-1gp5qnb-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton, & .css-zcgqxx-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton': {
        backgroundColor: 'transparent',
        boxShadow: 'var(--datePicker-box-shadow)',
        color: 'var(--accent-color)',
        '&:hover': {
          boxShadow: 'var(--datePicker-box-shadow)',
        },
      },
      /////// Active button ///////
      '& .css-h2z9v1-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton, & .css-rjqbug-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton': {
        backgroundColor: 'transparent',
        boxShadow: 'var(--inset-input-shadow)',
        color: 'var(--accent-color)',
        cursor: 'default',
        '&:hover': {
          boxShadow: 'var(--inset-input-shadow)',
        },
      },
      '& .MuiClock-pin, & .MuiClockPointer-root, & .MuiClockPointer-thumb': {
        backgroundColor: 'var(--accent-text-color)',
      },
      '& .MuiClockPointer-thumb': {
        border: '16px solid var(--accent-text-color)'
      },
      '& .MuiClock-clock': {
        backgroundColor: "transparent",
      },
      '& .MuiClock-squareMask': {
        boxShadow: 'var(--inset-input-shadow)',
      },
      '& .MuiClockNumber-root.Mui-selected': {
        backgroundColor: 'transparent!important',
        boxShadow: 'none',
      }
    }
  }
}
