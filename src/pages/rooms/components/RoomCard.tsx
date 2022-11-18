import { useState } from "react";
import styles from "../rooms.module.scss";
import cn from "classnames";
import ModalRooms from "./ModalRooms";
import RoomInfo from "./RoomInfo";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { setRoomId, setFloor } from "redux&saga/slices/booking.slice";
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
            className={cn(status ? styles.indicatorTrue : styles.indicator)}
          ></span>
        </div>
        <div className={styles.roomInfo}>
          {data.devices.map((device, index) => {
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

          <span className={styles.capacityLabel}>
            {data.capacity}
            <div className={styles.membersIco}></div>
          </span>

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
            <svg
              className={styles.svg}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13 16h-2v-6h2v6zm-1-10.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0-2.75c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z" />
            </svg>
          </span>
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

//   return (
//     <div className={styles.card} data-info={openInfo}>
//       <div
//         data-testid="room-card"
//         className={
//           openInfo
//             ? cn(styles.roomCardContainer, styles.infoChoose)
//             : styles.roomCardContainer
//         }
//         onClick={() => {
//           setOpen(true);
//           setOpenInfo(false);
//         }}
//       >
//         <div className={styles.headerRoomCard}>
//           <span className={styles.labelRoomName}>{data.name}</span>
//           <span className={styles.indicator}></span>
//         </div>
//         <div className={styles.roomInfo}>
//           {data.equipment.projector && (
//             <div
//               data-testid="icoProjector"
//               className={styles.projectorIco}
//             ></div>
//           )}
//           {data.equipment.TV && (
//             <div data-testid="icoTV" className={styles.tvIco}></div>
//           )}
//           <span className={styles.capacityLabel}>
//             {data.capacity}
//             <div className={styles.membersIco}></div>
//           </span>
//           <span
//             data-testid="info-button"
//             className={styles.info}
//             onClick={(event) => {
//               setOpenInfo((prev) => !prev);
//               event.stopPropagation();
//             }}
//           >
//             <svg
//               className={styles.svg}
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//             >
//               <path d="M13 16h-2v-6h2v6zm-1-10.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0-2.75c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z" />
//             </svg>
//           </span>
//         </div>
//       </div>

//       <span
//         data-testid="info-box"
//         data-info={openInfo}
//         className={styles.infoBox}
//         onMouseEnter={(event) => {
//           event?.preventDefault();
//         }}
//       >
//         <span className={styles.text}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi
//           dolorum neque
//           <div
//             className={styles.btn}
//             onClick={() => {
//               setOpen(true);
//               setOpenInfo(false);
//             }}
//           >
//             To book
//           </div>
//         </span>
//       </span>

//       {open && <ModalRooms setOpenModal={setOpen}></ModalRooms>}
//       <div className={cn(openInfo && styles.blur)}></div>
//     </div>
//   );
// };
