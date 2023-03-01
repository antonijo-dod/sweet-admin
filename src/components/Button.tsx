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
    const btnClass = classNames({
        "ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2":
            size === "xs",
        "ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2":
            size === "md",
    });

    return (
        <button
            {...props}
            type={type}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {children}
        </button>
    );
};

export default Button;
