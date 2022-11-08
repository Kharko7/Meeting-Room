import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import classNames from 'classnames/bind';
import styles from './toggle.module.scss'
const cn = classNames.bind(styles)



interface toggle {
  onclick: () => void;
  size?:string;
  type?:"themeToggle"|null
}
const Toggle = ({ onclick,size="medium",type=null}: toggle) => {
  const MainCn = cn(styles.toggle,styles[size]);



    return (
    <div className={MainCn} onClick={onclick}>
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
