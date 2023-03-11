import React, { ReactElement } from "react";
import classNames from "classnames";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    size?: "xs" | "sm" | "md" | "lg";
    children: React.ReactNode;
}

const Button = ({
    type = "button",
    size = "md",
    children,
    ...props
}: IButtonProps): ReactElement => {

    return (
        <button {...props} type={type} className="btn">
            {children}
        </button>
    );
};

export default Button;
