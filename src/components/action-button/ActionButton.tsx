import { useState } from "react";
import styles from "./actionButton.module.scss";
import cn from "classnames";
interface btn {
  type?: string;
  size?: string;
  onclick:()=>void
}
const ActionButton = ({ type = "edit", size = "medium", onclick }: btn) => {
  const MainCn = cn(styles.button, styles[type], styles[size]);

  return <button className={MainCn} onClick={()=>onclick()}></button>;
};

export default ActionButton;
