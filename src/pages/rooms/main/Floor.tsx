import RoomCard from "../components/RoomCard";
import styles from "../rooms.module.scss";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
interface floor {
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

const Floors = ({ currentFloor }: floor) => {
  const dataFloor = useAppSelector(
    (state) => state.rooms.roomsByFloor[currentFloor-1]
  );
  //@ts-ignore

  const length = dataFloor.length;
  const filter = useAppSelector((state) => state.rooms.filter);
  return (
    <div key={length}>
      {dataFloor.length > 0 && (
        <>
          {filter == "all" && (
            <p className={styles.pFloor}>Floor {currentFloor}</p>
          )}
          <div className={styles.floor}>
            {length > 0 &&
              dataFloor?.map((currentData, index) => (
                <RoomCard
                  data={currentData}
                  key={currentData.roomId}
                ></RoomCard>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Floors;
