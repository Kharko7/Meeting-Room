import React, { useState } from "react";
import styles from "./button.module.scss";
import cn from "classnames";

interface ButtonInterface {
  children?: string;
  size?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onclick: () => void
}

const Button = ({ children, size = "medium", disabled = false, type = 'button', onclick, }: ButtonInterface) => {
  const MainBtnCn = cn(styles.btn, styles[size]);

  return (
    <button className={MainBtnCn} disabled={disabled} type={type} onClick={() => onclick()}>
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;
