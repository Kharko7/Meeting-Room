export const styles = {
  paper: {
    borderRadius: "25px",
    backgroundColor: 'var(--primary-color)',
    boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    '& ul': {
      padding: '0'
    },
    '& li': {
      justifyContent: 'center',
      color: 'var(--mainColorFont)',
    }
  },
  selector: {
    '& .MuiSelect-select': {
      pl: '23px',
      color: 'var(--mainColorFont)'
    },
    '& .MuiFormHelperText-root': {
      ml: '23px'
    },
    '& .MuiFormLabel-root[data-shrink="true"]': {
      fontSize: ' 20px',
      top: '-11px',
      left: '9px',
      color: 'var(--label)',
    },
    '& .MuiFormLabel-root[data-shrink="false"]': {
      left: '10px',
      color: 'var(--mainColorFont)',
    },
    '& .MuiInputBase-root fieldset': {
      border: '0px solid var(--PickerGlobalColor)!important',
      borderRadius: '100px',
      boxShadow: 'var(--inset-input-shadow)',
    },
  }
};
