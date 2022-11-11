import Button from "../../components/button";
import { NavLink } from "react-router-dom";
import 'animate.css';


import classNames from 'classnames/bind';
import styles from './notFound.module.scss'
import {getFromLocalStorage} from "../../services/local-storage.service";
const cn = classNames.bind(styles)

const NotFound = () => {
  return (
    <div className={cn("container")}>
      <div className={cn("scene",
          'animate__animated animate__fadeIn'
      )}>
        <div className={cn("box")}>
          <div className={cn("facet", "front")}>4</div>
          <div className={cn("facet", "back")}>0</div>
          <div className={cn("facet", "right")}>4</div>
          <div className={cn("facet", "left")}>0</div>
          <div className={cn("facet", "top")}>Error</div>
          <div className={cn("facet", "bottom")}></div>
        </div>
        <div className={cn("shadow")}></div>
      </div>

      <div className={cn("desk")}>
        <p className={cn("oops","animate")}>
        <span>O</span>
        <span>o</span>
        <span>p</span>
        <span>s</span>
        <span>!&nbsp;	</span>
        <span>P</span>
        <span>a</span>
        <span>g</span>
        <span>e&nbsp;	 </span>
        <span>i</span>
        <span>s&nbsp;	 </span>
        <span>n</span>
        <span>o</span>
        <span>t &nbsp;	</span>
        <span>f</span>
        <span>o</span>
        <span>u</span>
        <span>n</span>
        <span>d</span>
        <span>!</span>
        </p>
        <NavLink to={getFromLocalStorage('access')?'/rooms':'/auth/login'}
                 className={cn('animate__animated animate__fadeIn')}
        >
          <Button onclick={() => {}} size="large">
            Go Back
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
export default NotFound;
