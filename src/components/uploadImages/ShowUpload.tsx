import React, { ReactElement, ReactNode } from 'react';

type TShowUploadProps = {
    children: ReactNode;
};

const ShowUpload = ({ children }: TShowUploadProps): ReactElement => {
    return <ul className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">{children}</ul>;
};

export default ShowUpload;
