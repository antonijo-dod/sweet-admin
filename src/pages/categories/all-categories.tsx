import { Fragment, ReactElement } from 'react';
import { PageHeading } from '@/components/ui';
import { CategoriesTableContainer } from '@/containers';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/20/solid';

const Categories = (): ReactElement => {
  return (
    <Fragment>
      <div className="p-8">
        <div className="pt-8 pb-4">
          <PageHeading
            title="All categories"
            action={
              <Link
                to={'/categories/new'}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New category
              </Link>
            }
          />
        </div>
        <CategoriesTableContainer />
      </div>
    </Fragment>
  );
};

export default Categories;
