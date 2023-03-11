import React, { ReactElement } from "react";
import { RecipeForm } from "@/components";
import { useGetRecipeBySlug } from "@/hooks/recipes";
import { useParams } from "react-router-dom";

const EditRecipeForm = (): ReactElement => {
    // When save show success message
    // When change publish state show success message
    const { slug } = useParams<{ slug: string }>();
    const recipe = useGetRecipeBySlug(slug);

    const handleOnFormSubmit = (values: any) => {
        // On success show toast message
        // When saving is in process show loading button on on image modal with text "Saving..." and spinner
        console.log(values);
    };

    if (recipe.isLoading) return <div>Loading</div>;
    if (recipe.isError) return <div>Error</div>;

    return (
        <RecipeForm
            onFormSubmit={(formDataValue) => handleOnFormSubmit(formDataValue)}
            defaultData={recipe.data.data}
        />
    );
};

export default EditRecipeForm;
