import React, { useState } from "react";
import styles from "./button.module.scss";
import cn from "classnames";

interface ButtonInterface {
  children?: string;
  size?: string;
  disabled?: boolean;
  styleType?: "success" | "warning" | "error" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  dataTestId?: string
  onclick: () => void;
}

const Button = ({
  children,
  size = "medium",
  disabled = false,
  type = "button",
  dataTestId = '',
  onclick,
  styleType = "success",
}: ButtonInterface) => {
  const MainBtnCn = cn(styles.btn, styles[size]);

  return (
    <button
      data-testid={dataTestId}
      className={MainBtnCn}
      disabled={disabled}
      type={type}
      onClick={() => (!disabled ? onclick() : null)}
    >
      <span
        data-testid="span-1"
        className={cn(styles.label, styles[styleType])}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
