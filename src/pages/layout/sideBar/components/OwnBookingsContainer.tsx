import styles from "../SideBar.module.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "components/timePicker/styles/styles.module.scss";
import OwnBookings from "./OwnBookings";
import { ownBookingsActions } from "redux&saga/slices/ownBookings.slice";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import Loader from "pages/layout/loader/Loader";
import { flexbox } from "@mui/system";
interface booking {
  bookingId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isRecurring: boolean;
  creatorId_FK: number;
  room_FK: number;
}
export interface InitialStateBookig {
  bookings: Array<booking> | [];
}

const OwnBookingsContainer = () => {
  const [hasMore, setHasMore] = useState(true);
  const { totalCount, limit, bookings,page } = useAppSelector(
    (state) => state.ownBookings
  );
  const pages = Math.ceil(totalCount / limit);
  const dispatch = useAppDispatch();
  const handleNext = () => {
    if (page + 1 <= pages) {
      dispatch(ownBookingsActions.setPage(page+1));
      dispatch(ownBookingsActions.getOwnBookings(page + 1));
    } 
  };
  useEffect(() => {
    dispatch(ownBookingsActions.getTotal(1));
  }, []);

  return (
    <div className={styles.myRoomsContainer} data-testid="my-rooms">
      <p className={styles.labelMyRooms}>my bookings</p>

      <InfiniteScroll
        height="50vh"
        dataLength={page}
        endMessage={<p></p>}
        next={() => handleNext()}
        hasMore={hasMore}
        className={styles.scroll}
        scrollThreshold="100%"
        loader={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader size="small"></Loader>
          </div>
        }
      >
        <div className={styles.roomsCardsContainer}>
          {/* <MyRoomCard mockedData={mockedData}></MyRoomCard> */}
          {bookings.map((booking:any, index) => {
            return <OwnBookings key={index} booking={booking} index={index}></OwnBookings>;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default OwnBookingsContainer;
