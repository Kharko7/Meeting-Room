import styles from "./SideBar.module.scss";
import MockedData from "./components/MockedData";
import MyRooms from "./components/MyRooms";
import ActionButton from "../../../components/icon-button/IconButton";
type SideBarProps = { userName: string };
const SideBar = ({ userName }: SideBarProps) => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.settContainer}>
        <div className={styles.userImg}></div>
        <span className={styles.label}>{userName}</span>
        <ActionButton
          type="settings"
          size="medium"
          onclick={() => {}}
        ></ActionButton>
      </div>
      <MyRooms mockedData={MockedData}></MyRooms>
    </div>
  );
};

export default SideBar;
