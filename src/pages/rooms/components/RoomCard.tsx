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
const RoomCard = ({ data,
                    // key
}: MyroomsData) => {
  const [open, setOpen] = useState(false);
  // console.log(data, key);

  return (
    <div
        // key={key}
    >
      <button
        className={
          open
            ? cn(styles.roomCardContainer, styles.open)
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
        </div>
      </button>
      {open && (
        <Modal closeModal={setOpen}>
          <form className={styles.modalContainer}>
            {" "}
            <h1 className={styles.modalName}>{data.name}</h1>
            <div className={styles.modalInput}>
              <DatePicker />
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
    </div>
  );
};
export default RoomCard;
