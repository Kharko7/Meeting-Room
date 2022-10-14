import styles from "./modal.module.scss";
import ActionButton from "../action-button/ActionButton";
interface modal {
  closeModal: (value: boolean) => void;
}

const Modal = ({ closeModal }: modal) => {
  
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <span className={styles.close}>
          <ActionButton
            type="close"
            size="small"
            onclick={() => closeModal(false)}
          ></ActionButton>
        </span>
      </div>
    </div>
  );
};

export default Modal;
