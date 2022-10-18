import RoomCard from "../components/RoomCard";
import styles from "../rooms.module.scss";

interface floor {
  data: Array<room>;
  currentFloor: number;
}
interface room {
  name: string;
  floor: number;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
}
const Floor = ({ data, currentFloor }: floor) => {
  return (
    <>
      <p className={styles.pFloor}>Floor {currentFloor}</p>
      <div className={styles.floor}>
        {data?.map((currentData, index) =>
          currentData.floor == currentFloor ? (
            <RoomCard data={currentData} key={index}></RoomCard>
          ) : null
        )}
      </div>
    </>
  );
};

export default Floor;
