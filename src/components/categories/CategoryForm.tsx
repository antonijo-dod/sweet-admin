import React, { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from '@/components/elements';

type TFormValues = {
    name: string;
    slug: string;
};

type TCategoryFormProps = {
    onFormSubmit: (values: TFormValues) => void;
    defaultData?: TFormValues;
};

const CategoryForm = ({ onFormSubmit, defaultData }: TCategoryFormProps): ReactElement => {
    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TFormValues>({
        defaultValues: defaultData,
    });

    const onSubmit = (values: TFormValues) => {
        onFormSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Info about your recipe</h3>
                    <p className="mt-1 text-sm text-gray-500">Fill all the fields to create a new recipe.</p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="col-span-12 sm:col-span-3">
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name required' }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextInput
                                    label="Name"
                                    placeholder="Input recipe name"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-3">
                        <Controller
                            name="slug"
                            control={control}
                            rules={{ required: 'Slug required' }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextInput
                                    label="Slug"
                                    placeholder="Input slug"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CategoryForm;
