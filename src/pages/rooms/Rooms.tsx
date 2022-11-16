import styles from "./rooms.module.scss";
import Header from "./header/Header";
import Floors from "./main/Floor";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { useEffect } from "react";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import Loader from "pages/layout/loader/Loader";
const Rooms = () => {
  const { rooms, floors, filter } = useAppSelector((state) => state.rooms);
  const dataFloor = useAppSelector((state) => state.rooms.roomsByFloor[Number(filter) - 1])
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(roomsActions.getRooms());
  }, []);
  return (
    <div className={styles.roomsContainer}>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.roomsList}>
          {rooms.length > 0 && filter == "all" ? (
            floors.map((currentFloor, index) => {
              return <Floors key={index} currentFloor={currentFloor}></Floors>;
            })
          ) : filter !== "all" ? (
            dataFloor.length > 0 ? (
              <Floors currentFloor={Number(filter)}></Floors>
            ) : (
              <p className={styles.noFloor}>
                There are no meeting rooms on this floor
              </p>
            )
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
