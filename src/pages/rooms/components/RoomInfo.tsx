import styles from "../rooms.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import Loader from "pages/layout/loader/Loader";
import "../rooms.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
//@ts-ignore
const RoomInfo = ({ openInfo, setOpenInfo, setOpen }) => {
  const roomInfo = useAppSelector(
    (state) => state.rooms.roomSoonestBookingsDays
  );
  const length = roomInfo.length;
  const roomSoonestBookingsDays = length != 0 ? roomInfo[0].bookings : [];
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
                      Starts:
                      <span>
                        {dayjs(booking.startDateTime).format("HH:mm")}{" | "}
                        {dayjs(booking.startDateTime).format("DD MMMM YYYY")}
                      </span>
                    </div>
                    <div className={styles.soonestBookingDesc}>
                      Ends:
                      <span>
                        {dayjs(booking.endDateTime).format("HH:mm")} {" | "}
                        {dayjs(booking.endDateTime).format("DD MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.thisRoom}>
               Please wait, maybe this room is available for the next 10 days
              </p>
            )}
          </div>
        </InfiniteScroll>
      </span>
    </span>
  );
};
export default RoomInfo;