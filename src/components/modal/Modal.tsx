import styles from "./modal.module.scss";
import IconButton from "../icon-button/IconButton";
interface modal {
  closeModal?: (value: boolean) => void;
  children?: React.ReactNode;
  closeBtn?: boolean;
}

const Modal = ({ closeBtn = true, closeModal, children }: modal) => {
  return (
    <div className={styles.modalBackground} data-testid="modal">
      <div className={styles.modalContainer}>
        {closeBtn && (
          <span className={styles.close}>
            <IconButton
              type="close"
              size="medium"
              onclick={() => {
               closeModal && closeModal(false);
              }}
            ></IconButton>
          </span>
        )
        }
        {children}
      </div>
    </div>
  );
};

export default Modal;
