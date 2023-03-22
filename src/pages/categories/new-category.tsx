import { Fragment, ReactElement, useState } from 'react';
import { PageHeading } from '@/components/ui';
import { Button } from '@/components';
import { CategoryForm } from '@/containers';

const NewCategory = (): ReactElement => {
    return (
        <Fragment>
            <div className="p-8 ml-8 mr-8 my-8 bg-white">
                <PageHeading
                    title="Create category"
                    action={
                        <Button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save recipe
                        </Button>
                    }
                />
            </div>
            <div className="p-8 ml-8 mr-8 bg-white">
                <CategoryForm />
            </div>
        </Fragment>
    );
};

export default NewCategory;
