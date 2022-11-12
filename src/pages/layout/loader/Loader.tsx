import cn from "classnames";
import styles from "./loader.module.scss";
interface loader {
  size?: "medium"|"large"|"small";
}
const Loader = ({ size='medium' }: loader) => {
  const MainStylesSpan = cn(styles.r, styles[size]);
  const MainStylesContainer = cn(styles.container, styles[size]);

  return (
    <div className={MainStylesContainer}>
      <span className={cn(MainStylesSpan, styles.r1)}></span>
      <span className={cn(MainStylesSpan, styles.r2)}></span>
      <span className={cn(MainStylesSpan, styles.r3)}></span>
      <span className={cn(MainStylesSpan, styles.r4)}></span>
      <span className={cn(MainStylesSpan, styles.r5)}></span>
    </div>
  );
};
export default Loader;
