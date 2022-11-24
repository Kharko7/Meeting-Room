import { useState } from "react";
import styles from "../rooms.module.scss";
import cn from "classnames";
import ModalRooms from "./ModalRooms";
import RoomInfo from "./RoomInfo";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { setRoomId, setFloor } from "redux&saga/slices/booking.slice";
import Button from "components/button";
interface MyroomsData {
  data: rooms;
}
interface data {
  name: string;
  floor: number;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
}
// interface devices {
//   deviceId: number;
//   name: "white board" | "projector" | "air conditioner" | "screen";
// }
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
const RoomCard = ({ data }: MyroomsData) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [open, setOpen] = useState(false);
  const { roomSoonestBookingsDays, statuses } = useAppSelector(
    (state) => state.rooms
  );
  //@ts-ignore
  const status = statuses[data.roomId];
  const length = roomSoonestBookingsDays.length;
  const dispatch = useAppDispatch();
  const handleBookingRoom = () => {
    dispatch(setRoomId(data.roomId));
    dispatch(setFloor(data.floor.toString()));
  };
  const showSoonestBookings = (roomId: number) => {
    dispatch(roomsActions.getSoonestBookingsDays(roomId));
  };
  const setSoonestBookings = () => {
    dispatch(roomsActions.setSoonestBookingsDays([]));
  };
  return (
    <div className={styles.card} key={data.roomId} data-info={openInfo}>
      <div
        data-testid="room-card"
        className={
          openInfo
            ? cn(styles.roomCardContainer, styles.infoChoose)
            : styles.roomCardContainer
        }
        onClick={() => {
          setOpen(true);
          setOpenInfo(false);
          handleBookingRoom();
        }}
      >
        <div className={styles.headerRoomCard}>
          <span className={styles.labelRoomName}>{data.name}</span>
          <span
            className={cn(status ? styles.indicator : styles.indicatorTrue)}
          >
            {status ? (
              <svg
                className={styles.statusIco}
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                  fillRule="nonzero"
                />
              </svg>
            ) : (
              <svg
                className={styles.statusIco}
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                  fillRule="nonzero"
                />
              </svg>
            )}
          </span>
        </div>{" "}
        <div>
          <div className={styles.roomInfo}>
          <div className={styles.devicesRoom}>   {data.devices.map((device, index) => {
              switch (device.deviceId) {
                case 1:
                  return (
                    <div
                      key={index}
                      data-testid="icoScreen"
                      className={styles.screenIco}
                    ></div>
                  );
                case 2:
                  return (
                    <div
                      key={index}
                      data-testid="icoConditioner"
                      className={styles.conditionerIco}
                    ></div>
                  );
                case 3:
                  return (
                    <div
                      key={index}
                      data-testid="icoProjector"
                      className={styles.projectorIco}
                    ></div>
                  );
                case 4:
                  return (
                    <div
                      key={index}
                      data-testid="icoBoard"
                      className={styles.boardIco}
                    ></div>
                  );
              }
            })}
           </div>
            <span className={styles.capacityLabel}>
              {data.capacity}
              <div className={styles.membersIco}></div>
            </span>
          </div>

          <div className={styles.reserveRoom}>
            <span
              data-testid="info-button"
              className={styles.info}
              onClick={(event) => {
                openInfo &&
                  length > 0 &&
                  setTimeout(() => setSoonestBookings(), 1000);
                !openInfo && showSoonestBookings(data.roomId);
                setOpenInfo((prev) => !prev);
                event.stopPropagation();
              }}
            >
              {/* <svg
              className={styles.svg}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13 16h-2v-6h2v6zm-1-10.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0-2.75c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z" />
            </svg> */}
              <svg
                className={styles.svg}
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
                  fillRule="nonzero"
                />
              </svg>
            </span>
            <span className={styles.buttonReserve}>
           
              <Button onclick={() => {}}>reserve a room</Button>
            </span>
            
          </div>
        </div>
      </div>

      <RoomInfo
        setOpenInfo={setOpenInfo}
        openInfo={openInfo}
        setOpen={setOpen}
      />

      {open && <ModalRooms setOpenModal={setOpen}></ModalRooms>}
      <div className={cn(openInfo && styles.blur)}></div>
    </div>
  );
};
export default RoomCard;
