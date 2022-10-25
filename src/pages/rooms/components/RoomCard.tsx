import Modal from "components/modal/Modal";
import { useState } from "react";
import styles from "../rooms.module.scss";
import cn from "classnames";
import TimePickerComponent from "components/timePicker/Timepicker";
import DatePicker from "components/datePicker";
import Button from "components/button/Button";

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
      console.log('====================================');
      console.log('====================================');
      document.body.style.position = "fixed";
      document.body.style.top = `-${scroll}px`;
      console.log(scroll);
    } else {
      document.body.style.position = "static";
      const top = document.body.style.top;
      document.body.style.top = "";
      //@ts-ignore
      window.scrollTo(0, parseInt(top||0) * -1);
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
          {data.equipment.projector ? (
            <div className={styles.projectorIco}></div>
          ) : (
            <></>
          )}
          {data.equipment.TV ? <div className={styles.tvIco}></div> : <></>}
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
            info
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
      {open && (
        <Modal closeModal={setOpen}>
          <form className={styles.modalContainer}>
            {" "}
            <h1 className={styles.modalName}>{data.name}</h1>
            <div className={styles.modalInput}>
              <DatePicker
                date={undefined}
                label={""}
                errorMsg={""}
                onChange={() => {}}
              />
            </div>
            <div className={styles.modalInput}>
              <TimePickerComponent />
            </div>
            <input
              placeholder="Choose duration"
              className={styles.chooseDuration}
            />
            <Button size="large" onclick={() => {}}>
              to book
            </Button>
          </form>
        </Modal>
      )}
      <div className={openInfo ? styles.blur : styles.none}></div>
    </div>
  );
};
export default RoomCard;
