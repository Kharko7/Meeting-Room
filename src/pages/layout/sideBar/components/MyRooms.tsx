import { useState } from "react";
import styles from "../SideBar.module.scss";
import MyRoomCard from "./MyRoomCard";
import Pagination from "./Pagination";
interface MyroomsData {
  name: string;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
  date: string;
  endTime: string;
  startTime: string;
}
interface Data {
  mockedData: Array<MyroomsData>;
}
const MyRooms = ({ mockedData }: Data) => {
  const [activePage, setActivePage] = useState(1);

  const sliceData = mockedData.slice(
    (activePage - 1) * 4,
    4 + (activePage - 1) * 4
  );
  console.log(sliceData);

  return (
    <div className={styles.myRoomsContainer}>
      <p className={styles.labelMyRooms}>my bookings</p>
      <div className={styles.roomsCardsContainer}>
        <MyRoomCard mockedData={sliceData}></MyRoomCard>
      </div>
      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
      ></Pagination>
    </div>
  );
};
export default MyRooms;
