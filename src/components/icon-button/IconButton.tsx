import { useState } from "react";
import styles from "./iconButton.module.scss";
import cn from "classnames";
interface btn {
  type?: string;
  mg?: boolean;
  size?: string;
  onclick?: () => void;
}
const IconButton = ({
  type = "edit",
  size = "medium",
  onclick = () => {},
  mg = false,
}: btn) => {
  const MainCn = cn(
    styles.button,
    styles[type],
    styles[size],
    mg ? styles.margin : styles.none
  );

  return (
    <button
      data-testid="iconButton"
      className={MainCn}
      onClick={() => onclick()}
    ></button>
  );
};

export default IconButton;
