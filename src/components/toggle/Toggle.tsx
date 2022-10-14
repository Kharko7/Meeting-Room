import styles from './toggle.module.scss'
import cn from 'classnames'
interface toggle{
  onclick:()=>{}
}
const Toggle = ({ onclick }: toggle) => {
  return (
    <div className={styles.toggle} onClick={onclick}>
      <input type="checkbox" />
    </div>
  );
};
export default Toggle;
