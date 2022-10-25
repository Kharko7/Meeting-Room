import styles from "./modal.module.scss";
import ActionButton from "../icon-button/IconButton";
interface modal {
  closeModal: (value: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({ closeModal, children }: modal) => {
  document.body.style.position = "fixed";
  document.body.style.top = `-${window.scrollY}px`;

  const ToggleModal = () => {
    const top = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <span className={styles.close}>
          <ActionButton
            type="close"
            size="small"
            onclick={() => {
              closeModal(false);
              ToggleModal();
            }}
          ></ActionButton>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
