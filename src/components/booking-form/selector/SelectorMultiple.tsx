import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styles } from 'components/selector-floor-and-room/selector-styles';

interface SelectorMultipleProps {
  value: string[],
  label: string;
  daysOfWeek: Record<string, string>;
  dataTestId: string;
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const SelectorMultiple = ({ dataTestId, value, label, daysOfWeek, onChange }: SelectorMultipleProps) => {

  const menuItems = Object.keys(daysOfWeek).map(week => (
    <MenuItem
      key={daysOfWeek[week]}
      value={daysOfWeek[week]}>
      {week}
    </MenuItem>
  ))

  return (
    <FormControl
      fullWidth
      sx={styles.selector }>
      <InputLabel >{label}</InputLabel>
      <Select
        data-testid={dataTestId}
        multiple
        value={value}
        MenuProps={{
          disableAutoFocusItem: true,
          sx: {
            '& .MuiPaper-root': styles.paper,
          }
        }}
        onChange={onChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default SelectorMultiple
