import styles from "../rooms.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "pages/layout/loader/Loader";
import "../rooms.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
//@ts-ignore
const RoomInfo = ({ openInfo, setOpenInfo, setOpen }) => {
  const roomInfo = useAppSelector(
    (state) => state.rooms.roomSoonestBookingsDays
  );
  const length = roomInfo.length;
  // console.log(roomInfo);
  const roomSoonestBookingsDays = length != 0 ? roomInfo[0].bookings : [];
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1];
  return (
    <span
      data-testid="info-box"
      data-info={openInfo}
      className={styles.infoBox}
      onMouseEnter={(event) => {
        event?.preventDefault();
      }}
    >
      <span className={styles.text}>
        <InfiniteScroll
          next={() => {}}
          hasMore={length == 0 ? true : false}
          loader={
            <div className={styles.loaderCont}>
              <Loader size="small"></Loader>
            </div>
          }
          dataLength={1}
          className={styles.infinite}
        >
          <div className={styles.infiniteContainer}>
            {length != 0 ? (
              roomSoonestBookingsDays.map((booking: any) => {
                return (
                  <div className={styles.soonestBooking}>
                    <div className={styles.soonestBookingTitle}>
                      {booking.title}
                    </div>
                    {/* <div className={styles.soonestBookingDesc}>Time</div> */}
                    <div className={styles.soonestBookingDesc}>
                      Start:
                      <span>
                        {booking.startDateTime.slice(11, 16)}{" "}
                        {booking.startDateTime.slice(0, 10)}
                      </span>
                    </div>
                    <div className={styles.soonestBookingDesc}>
                      Finish:
                      <span>
                        {booking.endDateTime.slice(11, 16)}{" "}
                        {booking.endDateTime.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.thisRoom}>
                This room is available for the next 10 days
              </p>
            )}
          </div>
        </InfiniteScroll>
        <div
          className={styles.btn}
          onClick={() => {
            setOpen(true);
            setOpenInfo(false);
          }}
        >
          To book
        </div>
      </span>
    </span>
  );
};
export default RoomInfo;
// bookingId
// :
// 117
// creatorId_FK
// :
// 144
// description
// :
// "Recurring meeting 01"
// endDateTime
// :
// "2022-11-18T19:00:00.000Z"
// isRecurring
// :
// true
// roomId
// :
// {roomId: 3, name: 'black room', floor: 2, capacity: 4, office_FK: 1}
// room_FK
// :
// 3
// startDateTime
// :
// "2022-11-18T16:00:00.000Z"
// title
// :
// "Recurring meeting 01"
