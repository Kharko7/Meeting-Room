import styles from "./modal.module.scss";
import ActionButton from "../icon-button/IconButton";
interface modal {
  closeModal: (value: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({ closeModal, children }: modal) => {
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
        {children}
      </div>
    </div>
  );
};

export default Modal;
