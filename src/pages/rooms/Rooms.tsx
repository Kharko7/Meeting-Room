import styles from "./rooms.module.scss";
import Header from "./header/Header";
import Floors from "./main/Floor";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { useEffect } from "react";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import Loader from "pages/layout/loader/Loader";
const Rooms = () => {
  const floorCount = 3;
  const arr = Array.from({ length: floorCount }, (_, i) => i + 1);
  const { rooms } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(roomsActions.getRooms());
  }, []);
  return (
    <div className={styles.roomsContainer}>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.roomsList}>
          { rooms.length > 0  ? (
            arr.map((currentFloor, index) => {
              return (
                <Floors
                  key={index}
                  data={rooms}
                  currentFloor={currentFloor}
                ></Floors>
              );
            })
          ) : (
            <div className={styles.loader}>
              <Loader size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
