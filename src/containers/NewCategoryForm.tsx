import { useState } from 'react';
import { CategoryForm } from '@/components/categories';
import { Modal } from '@/components/ui';
import { Spinner } from '@/components/elements';
import { useCreateCategory } from '@/hooks/categories';

const NewCategoryForm = () => {
    const createCategory = useCreateCategory();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // When saving is in process show loading button on on image modal with text "Saving..." and spinner
    // If successful save the recipe and redirect to edit page

    const handleOnFormSubmit = async (values: any) => {
        setIsModalOpen(true);
        await createCategory.mutate(values, {
            onSuccess: () => {
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 2000);
            },
        });
    };

    return (
        <>
            <CategoryForm onFormSubmit={e => handleOnFormSubmit(e)} />
            <Modal
                title="Create new category in progress"
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

export default NewCategoryForm;
