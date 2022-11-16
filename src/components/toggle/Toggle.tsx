import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import classNames from 'classnames/bind';
import styles from './toggle.module.scss'
import { useState } from "react";
const cn = classNames.bind(styles)


interface toggle {
  size?: "medium" | "small" | "large";
  onclick: () => void;
  type?:"themeToggle"|null
}
const Toggle = ({ onclick,size="medium",type=null}: toggle) => {
  const MainCn = cn(styles.toggle,styles[size]);



    return (
    <div className={MainCn} data-testid={'toggle'} onClick={onclick}>
      <input type="checkbox"/>
      {type&&
        <>
          <div className={cn('moon')}><DarkModeIcon/></div>
          <div className={cn('sun')}><LightModeIcon/></div>
        </>
      }
    </div>

  );
};
export default Toggle;
