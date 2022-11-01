import styles from "../rooms.module.scss";

const SearchByName = () => {
  return (
    <div className={styles.input}>
      <div className={styles.ico}></div>
      <input
        placeholder="roomName"
        type="text"
        className={styles.inputComponent}
      />
    </div>
  );
};
export default SearchByName;
