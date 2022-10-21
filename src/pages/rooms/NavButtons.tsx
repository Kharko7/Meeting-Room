import { Link } from 'react-router-dom';
import styles from './rooms.module.scss'
import cn from 'classnames';
import IconButton from 'components/icon-button';
const NavButtons = () =>{
return (
  <div className={styles.navButton}>
    <Link to="/rooms" className={cn(styles.link, styles.current,styles.rooms)}>

    </Link>
    <Link to="/calendar" className={cn(styles.link,styles.calendar)}>

    </Link>
    <Link to="/map" className={cn(styles.link,styles.map)}>
 
    </Link>
  </div>
);
}
export default NavButtons