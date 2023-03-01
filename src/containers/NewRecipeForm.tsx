import React from "react";
import { RecipeForm } from "@/components";

const NewRecipeContainer = () => {
    // Send data to API - here sent to POST /recipes

    const handleOnFormSubmit = (values: any) => {
        console.log(
            "🚀 ~ file: NewRecipeForm.tsx:7 ~ NewRecipeContainer ~ values",
            values
        );
    };

    return <RecipeForm onFormSubmit={(e) => handleOnFormSubmit(e)} />;
};

export default NewRecipeContainer;
