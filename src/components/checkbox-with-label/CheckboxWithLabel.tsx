import styles from './checkboxWithLabel.module.scss'
import classNames from 'classnames/bind';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import FormControlLabel from '@mui/material/FormControlLabel';

const cn = classNames.bind(styles);
interface CheckboxWithLabelProps {
  checked: boolean;
  label?: string;
  onChange: () => void;
};

const CheckboxWithLabel = ({ checked, label = '', onChange }: CheckboxWithLabelProps) => {

  return (
    <FormControlLabel
      label={label ? label : null}
      sx={{ marginLeft: '0' }}
      control={<Checkbox
        className={cn((checked) ? ['checkbox', 'active'] : 'checkbox')}
        checked={checked}
        onChange={onChange}
        icon={< CheckIcon sx={{ transition: 'all 0.3s ease', color: 'transparent' }} />}
        checkedIcon={< CheckIcon fontSize='small' sx={{ transition: 'all 0.5s ease', color: '#1976d2', ml: '1px' }} />}
      />}
    />
  );
};

export default CheckboxWithLabel;