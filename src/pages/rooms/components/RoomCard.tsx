import Modal from "components/modal/Modal";
import { useState } from "react";
import styles from "../rooms.module.scss";
import cn from "classnames";
import TimePickerComponent from "components/timePicker/Timepicker";
import DatePicker from "components/datePicker";
import Button from "components/button/Button";
import { Dayjs } from "dayjs";
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
  // console.log(data, key);

  return (
    <div
    // key={key}
    >
      <div
        className={styles.roomCardContainer}
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
              event.stopPropagation();
            }}
          >
            info
            <span data-info={openInfo} className={styles.infoBox}>Lorem, ipsum dolor.</span>
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
    </div>
  );
};
export default RoomCard;
