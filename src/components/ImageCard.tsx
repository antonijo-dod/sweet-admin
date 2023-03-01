import { ReactElement, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

type TImageCardProps = {
    id: number;
    url: string;
    isChecked?: boolean;
    onSelect: ({ id, url }: { id: number; url: string }) => void;
};

const ImageCard = ({
    id,
    url,
    isChecked = false,
    onSelect,
}: TImageCardProps): ReactElement => {
    return (
        <li className="relative" onClick={() => onSelect({ id, url })}>
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                <img
                    src={url}
                    alt=""
                    className="object-cover pointer-events-none"
                />
                <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                >
                    <span className="sr-only">Select image image</span>
                </button>
            </div>
            {isChecked && (
                <div className="absolute top-2 left-2 bg-blue-500 rounded-full">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
            )}
        </li>
    );
};

export default ImageCard;
