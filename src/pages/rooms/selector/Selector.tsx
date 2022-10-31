import cn from "classnames";
import { useState } from "react";

import styles from "./selector.module.scss";
import FloorSelector from "./FloorSelector";
import RoomsSelector from "./RoomsSelector";
const Selector = () => {
  const floorCount = 4;
  const arr = Array.from({ length: floorCount }, (_, i) => i + 1);
  const [floor, setFloor] = useState("1");

  return (
    <div className={styles.container}>
      <FloorSelector arr={arr} floor={floor} setFloor={setFloor} />
      <RoomsSelector floor={floor} />
    </div>
  );
};

export default Selector;
