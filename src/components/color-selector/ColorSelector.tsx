import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './colorSelector.module.scss'
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectColorProps {
  pickedColor: string | undefined;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const ColorSelector = ({ pickedColor, onChange }: SelectColorProps) => {
  const colors = ['#28bbea', 'DarkSeaGreen', 'SandyBrown', '#7986cb', 'Silver']

  const menuItems = colors.map(color => (
    <MenuItem
      className={cn('items')}
      key={color}
      sx={{
        '& span': { backgroundColor: color },
      }}
      value={color}>
    </MenuItem>
  ))

  return (
    <FormControl sx={{
      "& .notranslate": {
        backgroundColor: pickedColor
      },
      width: 90,
      height: 80,
    }}>
      <InputLabel id="checkbox-label">Color</InputLabel>
      <Select
        labelId="checkbox-label"
        id="demo-simple-select"
        value={pickedColor}
        onChange={onChange}
        autoWidth
        label="Age"
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default ColorSelector