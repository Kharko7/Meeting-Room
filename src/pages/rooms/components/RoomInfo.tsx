import styles from "../rooms.module.scss";
import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "pages/layout/loader/Loader";
import "../rooms.module.scss";
//@ts-ignore
const RoomInfo = ({ openInfo, setOpenInfo, setOpen }) => {
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
          hasMore={false}
          loader={<Loader size="small"></Loader>}
          dataLength={3}
          className={styles.infinite}
        >
          <div className={styles.infiniteContainer}>
            {arr.map(() => {
              return (
                <div className={styles.soonestBooking}>
                  <div className={styles.soonestBookingTitle}>Meeting 1</div>
                  {/* <div className={styles.soonestBookingDesc}>Time</div> */}
                  <div className={styles.soonestBookingDesc}>
                    Start:
                    <span>{" 14:15 2022-11-11"} </span>
                  </div>
                  <div className={styles.soonestBookingDesc}>
                    Finish:<span>{`14:45 2022-11-11`} </span>
                  </div>
                </div>
              );
            })}
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
