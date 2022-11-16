import styles from "../rooms.module.scss";
import cn from "classnames";
import SearchByName from "../components/SearchByName";
// import TimePickerComponent from "../../../components/timePicker";
// import DatePickerComponent from "../../../components/datePicker";
import Selector from "../selector/Selector";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { MenuItem } from "@material-ui/core";
const Header = () => {
  const dispatch = useAppDispatch();
  const handle = (r: any) => {
    dispatch(roomsActions.setFilters(r));
  };
  const floors = useAppSelector((state) => state.rooms.floors);
  const filter = useAppSelector((state) => state.rooms.filter);

  return (
    <header className={styles.header}>
      <div
        className={cn(styles.filters, filter == "all" && styles.active)}
        onClick={() => handle("all")}
      >
        All
      </div>
      {floors.map((floor) => {
        return (
            <div
              className={cn(
                styles.filters,
                filter == `${floor.toString()}` && styles.active
              )}
              onClick={() => handle(floor)}
            >
              {floor} Floor
            </div>
          
        );
      })}
      {/* <SearchByName />
      <Selector/> */}
      {/* <DatePickerComponent />
      <TimePickerComponent /> */}
    </header>
  );
};

export default Header;
