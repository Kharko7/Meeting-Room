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
  [rest: string]: any;
};

const CheckboxWithLabel = ({ checked, label = '', onChange, ...rest }: CheckboxWithLabelProps) => {

  return (
    <FormControlLabel
      label={label}
      {...rest}
      control={<Checkbox
        className={cn((checked) ? ['checkbox', 'active'] : 'checkbox')}
        checked={checked}
        onChange={onChange}
        icon={< CheckIcon sx={{ transition: 'all 0.5s ease', color: 'transparent' }} />}
        checkedIcon={< CheckIcon fontSize='medium' sx={{ transition: 'all 0.5s ease', color: 'var(--accent-color)', ml: '1px' }} />}
      />}
    />
  );
};

export default CheckboxWithLabel;