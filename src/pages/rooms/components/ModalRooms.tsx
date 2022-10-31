
 import Modal from "../../../components/modal";
 import styles from "../rooms.module.scss";
 import TimePickerComponent from "../../../components/timePicker";
import DatePicker from "../../../components/datePicker";
import Button from "../../../components/button";
//@ts-ignore
 const ModalRooms = ({closeModal,data}) =>{
return(
        <Modal closeModal={closeModal}>
          <form className={styles.modalContainer}>
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
        </Modal>)
}
export default ModalRooms;