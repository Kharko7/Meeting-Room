import React, { useState } from "react";
import styles from "./button.module.scss";
import cn from "classnames";

interface ButtonInterface {
  children: string;
  size: string;
  onclick:()=>void
}

const Button = ({ children, size = "medium", onclick }: ButtonInterface) => {
  const MainBtnCn = cn(styles.btn, styles[size]);

  return (
    <button className={MainBtnCn} onClick={() => onclick()}>
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;
