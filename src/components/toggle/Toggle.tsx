import styles from './toggle.module.scss'
import cn from 'classnames'
interface toggle {
  onclick: () => {};
  size?:string;
}
const Toggle = ({ onclick,size="medium" }: toggle) => {
  const MainCn = cn(styles.toggle,styles[size]);
  return (
    <div className={MainCn} onClick={onclick}>
      <input type="checkbox" />
    </div>
  );
};
export default Toggle;
