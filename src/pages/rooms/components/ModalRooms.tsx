import Modal from "components/modal/Modal";
import styles from "./modal.module.scss";
import TimePickerComponent from "components/timePicker/Timepicker";
import DatePicker from "components/datePicker";
import Button from "components/button/Button";
import Selector from "../selector/Selector";
import { style } from "@mui/system";

//@ts-ignore
const ModalRooms = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <form className={styles.modalContainer}>
        <p className={styles.modalName}>Booking form</p>
        <div className={styles.modalInput}>
          <p className={styles.modalLabel}>Select room</p>
          <Selector></Selector>
        </div>

        <div className={styles.modalInput}>
          <p className={styles.modalLabel}>Select date </p>
          <DatePicker
            date={undefined}
            label={""}
            errorMsg={""}
            onChange={() => {}}
          />
        </div>
        <div className={styles.modalTime}>
          <div>
            <p className={styles.modalLabel}>Select start time</p>
            <TimePickerComponent />
          </div>
          <div>
            <p className={styles.modalLabel}>Select end time</p>
            <TimePickerComponent />
          </div>
        </div>
        <div className={styles.modalButton}>
          {" "}
          <Button size="large" onclick={() => {}}>
            to book
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default ModalRooms;
