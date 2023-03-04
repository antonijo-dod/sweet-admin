import React from "react";
import { RecipeForm } from "@/components";
import { useCreateRecipe } from "@/hooks/recipes";

const NewRecipeContainer = () => {
    const createRecipe = useCreateRecipe();

    const handleOnFormSubmit = async (values: any) => {
        await createRecipe.mutate(values);
    };

    return <RecipeForm onFormSubmit={(e) => handleOnFormSubmit(e)} />;
};

export default NewRecipeContainer;
