import React, { ReactElement } from "react";

type TextAreaProps = {
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    error?: boolean;
    helperText?: string | null | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextArea = ({
    label,
    placeholder,
    value,
    error,
    helperText,
    onChange,
}: TextAreaProps): ReactElement => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <textarea
                className={
                    error
                        ? "textarea textarea-bordered h-28 input-error"
                        : "textarea textarea-bordered h-28"
                }
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></textarea>
            <div className="label">
                <span className="label-text-alt text-error">{helperText}</span>
            </div>
        </div>
    );
};

export default TextArea;
