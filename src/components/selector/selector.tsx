import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './selector.module.scss'
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectColorProps {
  pickedColor: string;
  handleChangeData: (key: string) => (event: SelectChangeEvent<string>) => void;
}

const SelectColor = ({ pickedColor, handleChangeData }: SelectColorProps) => {
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
      width: 90
    }}>
      <InputLabel id="checkbox-label">Color</InputLabel>
      <Select
        labelId="checkbox-label"
        id="demo-simple-select"
        value={pickedColor}
        onChange={handleChangeData('backgroundColor')}
        autoWidth
        label="Age"
      >
        {menuItems}

      </Select>
    </FormControl>
  );
}

export default SelectColor