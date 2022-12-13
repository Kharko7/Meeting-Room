export const styles = {
  input: {
    '& .MuiInputBase-input': {
      pl: '23px'
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
    '& .MuiInputBase-multiline': {
      '& fieldset': {
        borderRadius: '25px',
      },
      '& .MuiInputBase-input': {
        pl: '9px'
      }
    }
  }
}
