import styles from './checkboxWithLabel.module.scss'
import classNames from 'classnames/bind';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import FormControlLabel from '@mui/material/FormControlLabel';

const cn = classNames.bind(styles);

interface CheckboxWithLabelProps {
  checked: boolean;
  label?: string;
  handleChange: () => void;
}

const CheckboxWithLabel = ({ checked, label, handleChange }: CheckboxWithLabelProps) => {

  return (
    <FormControlLabel
      sx={{ marginLeft: '0' }}
      control={< Checkbox
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 17, marginLeft: '0.6px' },
        }}
        className={cn((checked) ? ['checkbox', 'active'] : 'checkbox')}
        checked={checked}
        onChange={handleChange}
        icon={< CheckIcon sx={{ transition: 'all 0.3s ease', color: 'transparent' }} />}
        checkedIcon={< CheckIcon sx={{ transition: 'all 0.5s ease', color: '#000' }} />}
      />}
      label={label ? label : null} />
  )
}

export default CheckboxWithLabel