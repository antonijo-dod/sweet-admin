import React, { ReactElement } from "react";
import { RecipeForm } from "@/components";

const EditRecipeForm = (): ReactElement => {
    // Get default data from API
    // If success, update data
    // If fail, show error message
    // Save or publish action

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
        ingredients: [{ name: "Sir", amount: "2" }],
    };

    const handleOnFormSubmit = (values: any) => {
        // Update data on server
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
