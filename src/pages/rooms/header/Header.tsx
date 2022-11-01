import styles from "../rooms.module.scss";
import SearchByName from "../components/SearchByName";
// import TimePickerComponent from "../../../components/timePicker";
// import DatePickerComponent from "../../../components/datePicker";
import Selector from "../selector/Selector";
import { MenuItem } from "@material-ui/core";
const Header = () => {
  return (
    <header className={styles.header}>
      <SearchByName />
      <Selector/>
      {/* <DatePickerComponent />
      <TimePickerComponent /> */}
    </header>
  );
};

export default Header;
