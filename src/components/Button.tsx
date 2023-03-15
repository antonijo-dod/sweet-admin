import React, { ReactElement } from "react";
import classNames from "classnames";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "md" | "lg";
  wide?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "status"
    | "warning"
    | "error"
    | "ghost"
    | "link"
    | "outline"
    | "active"
    | "disabled";
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  size = "md",
  wide,
  variant = "primary",
  children,
  ...props
}: IButtonProps): ReactElement => {
  // TODO Add rest varinats
  const buttonClasses = classNames("btn", {
    "btn-xs": size == "xs",
    "btn-sm": size == "sm",
    "btn-md": size == "md",
    "btn-lg": size == "lg",

    "btn-primary": variant == "primary",
    "btn-secondary": variant == "secondary",
    "btn-link": variant == "link",

    "btn-block": wide,
  });

  return (
    <button {...props} type={type} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
