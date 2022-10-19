import styles from "../rooms.module.scss";
import SearchByName from "../components/SearchByName";
import TimePickerComponent from "components/timePicker";
import DatePickerComponent from "components/datePicker";
const Header = () => {
  return (
    <header className={styles.header}>
      <SearchByName />
      {/* <DatePickerComponent />
      <TimePickerComponent /> */}
    </header>
  );
};

export default Header;
