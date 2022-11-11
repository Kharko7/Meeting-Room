import styles from "./SideBar.module.scss";
import MockedData from "./components/MockedData";
import MyRooms from "./components/MyRooms";
import ActionButton from "../../../components/icon-button/IconButton";
import NavButtons from "pages/layout/sideBar/NavButtons";
import { NavLink, useLocation } from "react-router-dom";
import {FirstLetters} from "../../../utils/get-first-letters-by-login";
import {PseudoAvatar} from "../../../components";
type SideBarProps = { userName: string };

const SideBar = ({ userName }: SideBarProps) => {

  const location = useLocation()

  return (
    <div className={styles.position}>
      <div className={styles.sideBar}>
        <div className={styles.settContainer}>
          <div className={styles.userImg}>
            <PseudoAvatar firstname={'й'} lastname={"м"}/>
          </div>
          <span className={styles.label}>{userName}</span>
          <NavLink state={{ from: location }} to="/profile">
            <ActionButton
              type="settings"
              size="medium"
              onclick={() => { }}
            ></ActionButton>
          </NavLink>
        </div>
        <MyRooms mockedData={MockedData}></MyRooms>
      </div>
      <NavButtons />
    </div>
  );
};

export default SideBar;
