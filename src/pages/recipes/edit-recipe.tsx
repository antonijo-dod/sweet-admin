import { Fragment, ReactElement } from "react";

import { PageHeading } from "@/components/ui";
import { Button } from "@/components";
import { EditRecipeForm } from "@/containers";
import RecipeHeaderContainer from "@/containers/RecipeHeaderContainer";

const Recipes = (): ReactElement => {
  return (
    <Fragment>
      <RecipeHeaderContainer />
      <div className="p-8 mx-8 bg-white">
        <EditRecipeForm />
      </div>
    </Fragment>
  );
};

export default Recipes;
