import styles from "./selector.module.scss";
import cn from "classnames";
import { useState, useEffect } from "react";

//@ts-ignore
const CapacitySelector = () => {
  const [openRoom, setOpenRoom] = useState(false);
  const [counter, setCounter] = useState(1);

  return (
    <ul className={styles.dropdown}>
      <input
        className={styles.input}
        type="text"
        value={`${counter} capacity`}
        onClick={() => setOpenRoom((prev) => !prev)}
        readOnly={true}
      />
      <div className={cn(styles.ico, openRoom && styles.open)}></div>
      <div
        className={cn(styles.options, openRoom && styles.show, styles.capacity)}
      >
        <div
          className={styles.box}
          onClick={(event) => {
            setCounter((prev) => (prev > 1 ? prev - 1 : prev));
          }}
        >
          -
        </div>
        <div className={cn(styles.box, styles.boxInset)}>{counter}</div>
        <div
          className={styles.box}
          onClick={() => setCounter((prev) => prev + 1)}
        >
          +
        </div>
      </div>
    </ul>
  );
};

export default CapacitySelector;
