import React, { useState } from "react";
import styles from "./button.module.scss";
import cn from "classnames";

interface ButtonInterface {
  label: string;
  size: string;
  onclick:()=>void
}

const Button = ({ label, size = "medium", onclick }: ButtonInterface) => {
  const MainBtnCn = cn(
    styles.btn,
    styles[size]
  );

  return (
    <button className={MainBtnCn} onClick={() => onclick()}>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default Button;
