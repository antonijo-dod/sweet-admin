import { useState, CSSProperties } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
const Spinner = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <MoonLoader
                className="text-red-500"
                color="blue"
                loading={true}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;
