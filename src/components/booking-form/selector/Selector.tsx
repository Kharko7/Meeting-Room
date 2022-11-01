import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './selector.module.scss'
import { FormHelperText } from '@material-ui/core';

interface SelectorProps {
  value: string;
  errorMsg?: string;
  disabled?: boolean;
  label: string;
  menuItems: React.ReactNode;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const Selector = ({ value, label, menuItems, disabled = false, errorMsg = '', onChange }: SelectorProps) => {

  return (
    <FormControl
      error={Boolean(errorMsg)}
      disabled={disabled}
      fullWidth>
      <InputLabel >{label}</InputLabel>
      <Select
        value={value}
        MenuProps={{ disableAutoFocusItem: true }}
        onChange={onChange}
      >
        {menuItems}
      </Select>
      <FormHelperText variant='filled' error color='red'>{errorMsg ? errorMsg : ''}</FormHelperText>
    </FormControl>
  );
}

export default Selector