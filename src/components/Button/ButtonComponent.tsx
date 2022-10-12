import React, { useState } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
interface ButtonInterface {
  label: string;
}
const Button = ({ label }: ButtonInterface) => {
  const [pressed, setPress] = useState(false);
  return (
    <div>
      <div
        className={pressed ? cn(styles.btnPressed, styles.btn) : styles.btn}
        onClick={() => setPress((prev) => !prev)}
      >
        <span className={pressed ? styles.labelPressed : styles.none}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default Button;
