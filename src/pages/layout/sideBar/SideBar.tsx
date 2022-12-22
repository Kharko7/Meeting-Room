import styles from "./SideBar.module.scss";
import React, { useEffect } from "react";

import OwnBookingsContainer from "./components/OwnBookingsContainer";
import ActionButton from "../../../components/icon-button/IconButton";
import NavButtons from "pages/layout/sideBar/NavButtons";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks/use-toolkit-hooks";
import { useModal } from "../../../hooks/show.modal";
import { DialogComponent } from "../../../components/dialog/DialogComponent";
import AdminModalTool from "../../../components/admin/admin-modal-tools/AdminModalTool";
import BadgeRe from "../../../components/badge/BadgeRe";

type SideBarProps = { userName: string };

const SideBar = ({ userName }: SideBarProps) => {
  const location = useLocation();
  let { isShowing, toggle } = useModal();
  const { firstName, lastName, userRole } = useAppSelector((state) => state.user);

  return (
    <div className={styles.position}>
      {userRole === 'admin' &&
        isShowing &&
        <div>
          <DialogComponent
            isShowing={isShowing}
            children={<AdminModalTool onclick={toggle} />}
          />
        </div>}
      <div className={styles.sideBar}>
        <div className={styles.settContainer}>

          <span className={styles.label}>{firstName + ' ' + lastName}</span>
          <NavLink state={{ from: location }} to="/profile">
            <ActionButton
              type="settings"
              size="medium"
              onclick={() => { }}
            ></ActionButton>
          </NavLink>
        </div>
        {userRole === 'admin' &&
          <div className={styles.tools}>
            <div onClick={toggle}><BadgeRe component={'Tools'} variant={"dot"} badgeColor={"mint"} /></div>
          </div>}
        <OwnBookingsContainer />
      </div>
      <NavButtons />
    </div>
  );
};

export default SideBar;
