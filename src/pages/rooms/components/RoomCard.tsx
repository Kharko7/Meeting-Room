import { useState } from "react";
import styles from "../rooms.module.scss";
import cn from "classnames";
import ModalRooms from "./ModalRooms";

interface MyroomsData {
  data: data;
  key: number;
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
const RoomCard = ({
  data,
}: // key
MyroomsData) => {
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const ToggleInfo = () => {
    if (!openInfo) {
      let scroll = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scroll}px`;
      console.log(scroll);
    } else {
      document.body.style.position = "static";
      const top = document.body.style.top;
      document.body.style.top = "";
      //@ts-ignore
      window.scrollTo(0, parseInt(top || 0) * -1);
    }
  };

  return (
    <div>
      <div
        className={
          openInfo
            ? cn(styles.roomCardContainer, styles.infoChoose)
            : styles.roomCardContainer
        }
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={styles.headerRoomCard}>
          <span className={styles.labelRoomName}>{data.name}</span>
          <span className={styles.indicator}></span>
        </div>
        <div className={styles.roomInfo}>
          {data.equipment.projector && (
            <div className={styles.projectorIco}></div>
          )}
          {data.equipment.TV && <div className={styles.tvIco}></div>}
          <span className={styles.capacityLabel}>
            {data.capacity}
            <div className={styles.membersIco}></div>
          </span>
          <span
            className={styles.info}
            onClick={(event) => {
              setOpenInfo((prev) => !prev);
              ToggleInfo();
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
    <path d="M13.25 7c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25zm10.75 5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-2 0c0-5.514-4.486-10-10-10s-10 4.486-10 10 4.486 10 10 10 10-4.486 10-10zm-13-2v2h2v6h2v-8h-4z" />
          </svg>
          </span>
     
        
        
          <span data-info={openInfo} className={styles.infoBox}>
            <span className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              eligendi dolorum neque ipsum atque consequuntur distinctio ratione
              possimus unde magnam.
            </span>
          </span>
        </div>
      </div>
      {open && <ModalRooms closeModal={setOpen} ></ModalRooms>}
      <div className={cn(openInfo && styles.blur)}></div>
    </div>
  );
};
export default RoomCard;
