import { Fragment, ReactElement } from "react";

import { PageHeading } from "@/components/ui";
import { Button } from "@/components";
import { EditRecipeForm } from "@/containers";

const Recipes = (): ReactElement => {
    return (
        <Fragment>
            <div className="p-8">
                <div className="pt-8 pb-4">
                    <PageHeading
                        title="Edit recipe"
                        action={
                            <Button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Publish
                            </Button>
                        }
                    />
                </div>
            </div>
            <div className="p-8 ml-8 mr-8 bg-white">
                <EditRecipeForm />
            </div>
        </Fragment>
    );
};

export default Recipes;
