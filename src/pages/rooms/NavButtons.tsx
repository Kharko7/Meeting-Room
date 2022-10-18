import { Link } from 'react-router-dom';
import styles from './rooms.module.scss'
import cn from 'classnames';
const NavButtons = () =>{
return (
  <div className={styles.navButton}>
    <Link to="/rooms" className={cn(styles.link, styles.current)}>
      r
    </Link>
    <Link to="/calendar" className={styles.link}>
      c
    </Link>
    <Link to="/map" className={styles.link}>
      m
    </Link>
  </div>
)
}
export default NavButtons