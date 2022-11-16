import styles from "./SideBar.module.scss";
import { useEffect } from "react";

import OwnBookingsContainer from "./components/OwnBookingsContainer";
import ActionButton from "../../../components/icon-button/IconButton";
import NavButtons from "pages/layout/sideBar/NavButtons";
import { NavLink, useLocation } from "react-router-dom";
import {FirstLetters} from "../../../utils/get-first-letters-by-login";
import {PseudoAvatar} from "../../../components";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import { ownBookingsActions } from "redux&saga/slices/ownBookings.slice";
type SideBarProps = { userName: string };

const SideBar = ({ userName }: SideBarProps) => {
  const bookings = useAppSelector((state) => state.ownBookings);
  const location = useLocation();

console.log(bookings);
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
              onclick={() => {}}
            ></ActionButton>
          </NavLink>
        </div>
        <OwnBookingsContainer />
      </div>
      <NavButtons />
    </div>
  );
};

export default SideBar;
