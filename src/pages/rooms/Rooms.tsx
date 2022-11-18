import styles from "./rooms.module.scss";
import Header from "./header/Header";
import Floors from "./main/Floor";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { useEffect } from "react";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import Loader from "pages/layout/loader/Loader";
const Rooms = () => {
  const { roomsByFloor, floors, filter, rooms } = useAppSelector(
    (state) => state.rooms
  );
  const dispatch = useAppDispatch();
  // setInterval(() => {
  //   console.log('60 second left')
  //   rooms.length > 0 && dispatch(roomsActions.getRoomsStatus(rooms));
  // }, 60000);
  useEffect(() => {
   rooms.length == 0 && dispatch(roomsActions.getRooms());

    // rooms.length == 0 && dispatch(roomsActions.getRoomsStatus());
  }, []);
  useEffect(() => {
    rooms.length > 0 && dispatch(roomsActions.getRoomsStatus(rooms));
  }, [rooms]);

  return (
    <div className={styles.roomsContainer}>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.roomsList}>
          {Object.keys(roomsByFloor).length > 0 && filter == "all" ? (
            floors.map((currentFloor, index) => {
              return <Floors key={index} currentFloor={currentFloor}></Floors>;
            })
          ) : filter !== "all" ? (
            Object.keys(roomsByFloor).length > 0 ? (
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
