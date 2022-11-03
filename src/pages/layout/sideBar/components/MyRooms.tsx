import styles from "../SideBar.module.scss";
import MyRoomCard from "./MyRoomCard";
import InfiniteScroll from "react-infinite-scroll-component";
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

  return (
    <div className={styles.myRoomsContainer}>
      <p className={styles.labelMyRooms}>my bookings</p>
      {/* @ts-ignore  */}
      <InfiniteScroll
        height="50vh"
        dataLength={mockedData.length}
        next={()=>{}}
        hasMore={true}
      >
        <div className={styles.roomsCardsContainer}>
          <MyRoomCard mockedData={mockedData}></MyRoomCard>
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default MyRooms;
