import styles from "../SideBar.module.scss";
import MyRoomCard from "./MyRoomCard";

interface MyroomsData {
  name: string;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
  date: string;
  time: string;
}
interface Data {
  mockedData: Array<MyroomsData>;
}
const MyRooms = ({ mockedData }: Data) => {
  return (
    <div className={styles.myRoomsContainer}>
      <p className={styles.labelMyRooms}>my bookings</p>
      <div className={styles.roomsCardsContainer}>
        <MyRoomCard mockedData={mockedData}></MyRoomCard>
      </div>
    </div>
  );
};
export default MyRooms;
