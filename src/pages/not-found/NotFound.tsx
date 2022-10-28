import Button from "components/button";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./notFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scene}>
        <div className={styles.box}>
          <div className={cn(styles.facet, styles.front)}>4</div>
          <div className={cn(styles.facet, styles.back)}>0</div>
          <div className={cn(styles.facet, styles.right)}>4</div>
          <div className={cn(styles.facet, styles.left)}>0</div>
          <div className={cn(styles.facet, styles.top)}>Error</div>
          <div className={cn(styles.facet, styles.bottom)}></div>
        </div>
        <div className={styles.shadow}></div>
      </div>

      <div className={styles.desk}>
        <p className={styles.oops}> Oops! Page is not found!</p>
        <NavLink to={"/"}>
          <Button onclick={() => {}} size="large">
            Go Back Home
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
export default NotFound;
