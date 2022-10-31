import cn from "classnames";
import { useState } from "react";

import styles from "./selector.module.scss";
import FloorSelector from "./FloorSelector";
import RoomsSelector from "./RoomsSelector";
interface selector {
  floor?: string;
  name?: string;
}
//@ts-ignore
const Selector = ({ floor = "1", name }: selector) => {
  const floorCount = 4;
  const arr = Array.from({ length: floorCount }, (_, i) => i + 1);
  const [currentFloor, setFloor] = useState(floor);


  return (
    <div className={styles.container}>
      <FloorSelector arr={arr} floor={currentFloor} setFloor={setFloor} />
      <RoomsSelector floor={currentFloor} name={name} />
    </div>
  );
};

export default Selector;
