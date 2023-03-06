import React, { ReactElement } from "react";
import { RecipeForm } from "@/components";

const EditRecipeForm = (): ReactElement => {
    // When save show success message
    // When change publish state show success message

    const data = {
        title: "Novi recept",
        featured_image: [
            {
                id: 3,
                url: "https://plus.unsplash.com/premium_photo-1663844169349-4f831b83aa6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            },
            {
                id: 4,
                url: "https://images.unsplash.com/photo-1674569894883-5afe52e070b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            },
        ],
        ingredients: [
            { ingredientId: 1, amount: "2" },
            { ingredientId: 4, amount: "1" },
        ],
    };

    const handleOnFormSubmit = (values: any) => {
        // On success show toast message
        // When saving is in process show loading button on on image modal with text "Saving..." and spinner
        console.log(values);
    };

    return (
        <RecipeForm
            onFormSubmit={(formDataValue) => handleOnFormSubmit(formDataValue)}
            defaultData={data}
        />
    );
};

export default EditRecipeForm;
