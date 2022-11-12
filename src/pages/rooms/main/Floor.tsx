import RoomCard from "../components/RoomCard";
import styles from "../rooms.module.scss";

interface floor {
  data: Array<rooms>;
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
interface devices {
  deviceId: number;
  name: string;
}
interface rooms {
  roomId: number;
  name: string;
  floor: number;
  capacity: number;
  office_FK: number;
  devices: Array<devices>;
}

const Floors = ({ data, currentFloor }: floor) => {
  const dataFloor: Array<rooms> = [];
  data?.map((currentData, index) =>
    currentData.floor == currentFloor ? dataFloor.push(currentData) : null
  );
  return (
    <>
      {dataFloor.length > 0 && (
        <>
          <p className={styles.pFloor}>Floor {currentFloor}</p>
          <div className={styles.floor}>
            {dataFloor?.map((currentData, index) => (
              <RoomCard data={currentData} key={currentData.roomId}></RoomCard>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Floors;
