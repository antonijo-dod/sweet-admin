import { ReactElement } from 'react';

type TPageHeadingProps = {
    title: string;
    action: ReactElement;
};

const PageHeading = ({ title, action }: TPageHeadingProps): ReactElement => {
    return (
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{title}</h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="sm:ml-3">{action}</span>
            </div>
        </div>
    );
};

export default PageHeading;
