import styles from "./selector.module.scss";
import cn from "classnames";
import { useState, useEffect } from "react";
import MockedData from "../components/MockedData";
//@ts-ignore
const RoomsSelector = ({ floor }) => {
  const [room, setRoom] = useState(MockedData[0].name);
  const [openRoom, setOpenRoom] = useState(false);
  useEffect(() => {
    setRoom("Choose room");
  }, [floor]);
  return (
    <ul className={styles.dropdown}>
      <input
        className={styles.input}
        type="text"
        value={room}
        onClick={() => setOpenRoom((prev) => !prev)}
        readOnly={true}
      />
      <div className={cn(styles.ico, openRoom && styles.open)}></div>
      <ul className={cn(styles.options, openRoom && styles.show)}>
        {MockedData.map((data) => {
          if (data.floor.toString() == floor.toString()) {
            return (
              <li
                key={data.name}
                className={styles.item}
                onClick={() => {
                  setOpenRoom(false);
                  setRoom(data.name);
                }}
              >
                {data.name}
              </li>
            );
          }
        })}
      </ul>
    </ul>
  );
};

export default RoomsSelector;
