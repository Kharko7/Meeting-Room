import styles from "./selector.module.scss";
import cn from "classnames";
import { useState } from "react";
//@ts-ignore
const FloorSelector = ({ arr, floor,setFloor }) => {
  const [openFloor, setOpenFloor] = useState(false);

  return (
    <ul className={styles.dropdown}>
      <input
        className={styles.input}
        type="text"
        value={`${floor} Floor`}
        readOnly={true}
        onClick={() => setOpenFloor((prev) => !prev)}
      />
      <div className={cn(styles.ico, openFloor && styles.open)}></div>
      <ul className={cn(styles.options, openFloor && styles.show)}>
        {arr.map((currentFloor:any) => {
          return (
            <li
              key={currentFloor}
              onClick={() => {
                setOpenFloor(false);
                setFloor(currentFloor.toString());
              }}
              className={styles.item}
            >
              {currentFloor}
            </li>
          );
        })}
      </ul>
    </ul>
  );
};

export default FloorSelector;