import React, { ReactElement } from "react";

type TextInputProps = {
    label: string;
    placeholder: string;
    type?: string;
    value?: string | number;
    error?: boolean;
    helperText?: string | null | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
    label,
    placeholder,
    type,
    value,
    error,
    helperText,
    onChange,
}: TextInputProps): ReactElement => {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className={
                    error
                        ? "input input-bordered input-error"
                        : "input input-bordered"
                }
                value={value}
                onChange={onChange}
            />
            <div className="label">
                <span className="label-text-alt text-error">{helperText}</span>
            </div>
        </div>
    );
};

export default TextInput;
