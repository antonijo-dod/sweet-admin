import { useState } from "react";
import { RecipeForm } from "@/components";
import { useCreateRecipe } from "@/hooks/recipes";
import { Modal } from "@/components/ui";
import {} from "@heroicons/react/20/solid";
import { Spinner } from "@/components/elements";

const NewRecipeContainer = () => {
    const createRecipe = useCreateRecipe();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // When saving is in process show loading button on on image modal with text "Saving..." and spinner
    // If successful save the recipe and redirect to edit page

    const handleOnFormSubmit = async (values: any) => {
        setIsModalOpen(true);
        /* await createRecipe.mutate(values, {
            onSuccess: () => {},
        }); */
    };

    return (
        <>
            <RecipeForm onFormSubmit={(e) => handleOnFormSubmit(e)} />
            <Modal
                title="Create new recipe in progress"
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                children={
                    <div className="flex h-full w-full items-center">
                        <div className="text-red-500">
                            <Spinner />
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default NewRecipeContainer;
