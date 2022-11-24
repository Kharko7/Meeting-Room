import styles from "./SideBar.module.scss";
import React, {useEffect} from "react";

import OwnBookingsContainer from "./components/OwnBookingsContainer";
import ActionButton from "../../../components/icon-button/IconButton";
import NavButtons from "pages/layout/sideBar/NavButtons";
import {NavLink, useLocation} from "react-router-dom";
import {PseudoAvatar} from "../../../components";
import {useAppSelector} from "hooks/toolkitHooks";
import {useModal} from "../../../hooks/show.modal";
import {DialogComponent} from "../../../components/dialog/DialogComponent";
import AdminModalTool from "../../../components/admin/admin-modal-tools/AdminModalTool";
import BadgeRe from "../../../components/badge/BadgeRe";
import {getUserData} from "../../../services/local-storage.service";
import {colors, colorsFn} from "../../../utils/colors.arr";

type SideBarProps = { userName: string };

const SideBar = ({ userName }: SideBarProps) => {
  const location = useLocation();
  let {isShowing, toggle} = useModal();
  const {firstName,lastName,role} = getUserData();
  useEffect(()=>{},[colorsFn])
  
  return (
    <div className={styles.position}>
      {role==="admin"&&
          isShowing&&
          <div>
            <DialogComponent
                isShowing={isShowing}
                children={<AdminModalTool onclick={toggle}/>}
            />
          </div>}
      <div className={styles.sideBar}>
        <div className={styles.settContainer}>
          <div className={styles.userImg}>
            <PseudoAvatar firstname={firstName[0]} lastname={lastName[0]} color={colorsFn}/>
          </div>
          <span className={styles.label}>{firstName + ' ' + lastName}</span>
          <NavLink state={{ from: location }} to="/profile">
            <ActionButton
              type="settings"
              size="medium"
              onclick={() => {}}
            ></ActionButton>
          </NavLink>
        </div>
        {role==="admin"&&
            <div className={styles.tools}>
          <div onClick={toggle}><BadgeRe component={'Tools'} variant={"dot"} badgeColor={"mint"}/></div>
        </div>}
        <OwnBookingsContainer />
      </div>
      <NavButtons />
    </div>
  );
};

export default SideBar;
