import styles from "./modal.module.scss";

interface modal{
  children?: React.ReactNode
}
const Modal = ({ children }: modal) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className="modal"></div>
      </div>
    </div>
  );
};
export default Modal;
