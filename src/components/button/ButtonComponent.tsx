import React, { useState } from "react";
import styles from "./button.module.scss";
import cn from "classnames";

interface ButtonInterface {
  label: string;
  size:string;

}
const Button = ({ label, size ="medium" }: ButtonInterface) => {
  const [pressed, setPress] = useState(false);
  const MainBtnCn = cn(
    styles.btn,
     pressed ? styles.pressed : styles.none,
      styles[size]);
  const MainLabelCn = cn(pressed ? styles.labelPressed : styles.none);
  
  return (
      <div className={MainBtnCn} onClick={() => setPress((prev) => !prev)}>
        <span className={MainLabelCn}>{label}</span>
      </div>

  );
};

export default Button;
