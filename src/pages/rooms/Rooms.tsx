import styles from "./rooms.module.scss";
import MockedData from "./components/MockedData";
import Header from "./header/Header";
import Floor from "./main/Floor";

const Rooms = () => {
  const floorCount = 4;
  const arr = Array.from({ length: floorCount }, (_, i) => i + 1);

  return (
    <div className={styles.roomsContainer}>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.roomsList}>
          {arr.map((currentFloor, index) => {
            return (
              <Floor
                key={index}
                data={MockedData}
                currentFloor={currentFloor}
              ></Floor>
            );
          })}
        </div>

        {/* <NavButtons></NavButtons> */}
      </div>
      {/* <SideBar userName="Roman Borovets"></SideBar> */}
    </div>
  );
};

export default Rooms;
