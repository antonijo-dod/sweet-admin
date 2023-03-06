import { ReactElement, ReactNode } from "react";

type ImageThumbnailWithActionsProps = {
    url: string;
    actions: ReactNode;
};

const ImageThumbnailWithActions = ({
    url,
    actions,
}: ImageThumbnailWithActionsProps): ReactElement => {
    return (
        <div className="w-56 bg-base-100 shadow-xl relative rounded overflow-hidden">
            <figure className="rounded-lg">
                <img src={url} alt="Shoes" />
            </figure>
            <div className="absolute right-0 top-0 mr-4 mt-4">{actions}</div>
        </div>
    );
};

export default ImageThumbnailWithActions;
