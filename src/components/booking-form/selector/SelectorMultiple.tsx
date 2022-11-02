import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorMultipleProps {
  value: string[],
  errorMsg?: string;
  disabled?: boolean;
  label: string;
  daysOfWeek: Record<string, number>;
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const SelectorMultiple = ({ value, label, daysOfWeek, onChange }: SelectorMultipleProps) => {

  const menuItems = Object.keys(daysOfWeek).map(week => (
    <MenuItem
      key={daysOfWeek[week]}
      value={daysOfWeek[week]}>
      {week}
    </MenuItem>
  ))

  return (
    <FormControl
      fullWidth>
      <InputLabel >{label}</InputLabel>
      <Select
        multiple
        value={value}
        MenuProps={{ disableAutoFocusItem: true }}
        onChange={onChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default SelectorMultiple