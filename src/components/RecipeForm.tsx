
import { ReactElement, useState } from 'react';
import { MultipleUploadImage, SingleUploadImage } from '@/components';
import { TextInput, TextArea } from '@/components/elements';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Select from 'react-select';
import { useGetIngredients, useCreateIngredient } from '@/hooks/ingredients';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useGetCategories } from '@/hooks/categories';
import { convertValuesForOptions } from '@/utils/convertValuesForOptions';

type TFormValues = {
  name: string;
  slug: string;
  description: string;
  categories: number[];
  galleryImages: number[];
  preparingTime: number;
  cookingTime: number;
  portions: number;
  ingredients: { id: number; amount: string }[];
};

type TRecipeFormProps = {
  onFormSubmit: (data: TFormValues) => void;
  defaultData?: TFormValues;
};

const RecipeForm = ({ onFormSubmit, defaultData }: TRecipeFormProps): ReactElement => {
  const [searchIngredients, setSearchIngredients] = useState<string>('');
  const [categoryPage, setCategoryPage] = useState<number>(1);

  const ingredients = useGetIngredients({ search: searchIngredients });
  const createIngredient = useCreateIngredient();
  const categories = useGetCategories({ page: categoryPage });

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    defaultValues: defaultData,
  });

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    control,
    name: `ingredients`,
  });

  const onSubmit = (data: TFormValues) => {
    onFormSubmit({
      ...data,
      preparingTime: Number(data.preparingTime),
      cookingTime: Number(data.cookingTime),
      portions: Number(data.portions),
    });
  };

  const convertIngredientsForSelect = () => {
    const ingredientsData = ingredients.data?.data.map(ingredient => {
      return {
        value: ingredient.id,
        label: ingredient.name,
        id: ingredient.id,
      };
    });

    return ingredientsData;
  };

  const handleCreateIngredient = async (name: string) => {
    await createIngredient.mutate(
      { name },
      {
        onSuccess: data => {
          console.log('🚀 ~ file: RecipeForm.tsx:72 ~ await createIngredient.mutate ~ data:', data);
        },
      },
    );
  };

  const handleLoadOptions = async (inputValue: string) => {
    setSearchIngredients(inputValue);
    return convertIngredientsForSelect();
  };


  const loadOptions = (x, y, { currentPage }) => {
    const options = categories.data.data.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    setCategoryPage(currentPage + 1)
    return {
      options,
      hasMore: categories.data?.meta.currentPage < categories.data?.meta.totalPages,
      additional: {
        currentPage: currentPage + 1,
      },
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
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

            <div className="col-span-12 sm:col-span-6">
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextArea
                    label="Description"
                    placeholder="Input description"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                  Categories
                </label>
                <div className="mt-1">
                  {categories.isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <Controller
                      control={control}
                      name="categories"
                      render={({ field: { onChange, value, name, ref } }) => {
                        return (
                          <AsyncPaginate
                            ref={ref}
                            defaultValue={defaultData?.categories.map(category => ({
                              value: category.category.id,
                              label: category.category.name
                            }))}
                            isMulti={true}
                            isLoading={categories.isLoading}
                            loadOptions={loadOptions}
                            onChange={value => onChange(value.map(val => val.value))}
                            additional={{ currentPage: 1 }}
                          />
                        )
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-2">
              <Controller
                name="preparingTime"
                control={control}
                rules={{ required: 'Preparing time required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextInput
                    label="Preparing time"
                    placeholder="Input preparing time"
                    value={value}
                    type="number"
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </div>

            <div className="col-span-12 sm:col-span-2">
              <Controller
                name="cookingTime"
                control={control}
                rules={{ required: 'Cooking time required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextInput
                    label="Cooking time"
                    placeholder="Input cooking time"
                    value={value}
                    type="number"
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </div>

            <div className="col-span-12 sm:col-span-2">
              <Controller
                name="portions"
                control={control}
                rules={{ required: 'Portion number required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextInput
                    label="Portions"
                    placeholder="Input portion number"
                    value={value}
                    type="number"
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <div className="max-w-sm">
                <label htmlFor="featured-image" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured image
                </label>
                <Controller
                  name="featuredImageId"
                  control={control}
                  rules={{
                    required: 'Odaberi sliku',
                  }}
                  render={({ field: { ref, value, ...rest } }) => <SingleUploadImage value={value} {...rest} />}
                />
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label htmlFor="featured-image" className="block text-sm font-medium text-gray-700">
                Gallery images
              </label>
              <Controller
                name="galleryImages"
                control={control}
                rules={{
                  required: 'Odaberi slike',
                }}
                render={({ field: { ref, ...rest } }) => <MultipleUploadImage {...rest} />}
              />
            </div>
          </div>
        </div>
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Ingredients</h3>
            <p className="mt-1 text-sm text-gray-500">Write recipe ingredients.</p>
          </div>
          {/* ROW */}

          {!ingredients.isLoading && ingredients.data
            ? ingredientsFields.map((field, index) => (
              <div className="mt-6 grid gap-4 w-full" key={field.id}>
                <div>
                  <label className="label">
                    <span className="label-text">Ingredient name</span>
                  </label>
                  <div>
                    <Controller
                      control={control}
                      name={`ingredients.${index}.id` as const}
                      render={({ field: { onChange, value, ref } }) => {
                        return (
                          <AsyncCreatableSelect
                            ref={ref}
                            cacheOptions
                            className="min-w-full"
                            defaultValue={{
                              value: value,
                              label: ingredients.data.data.find(ingredient => ingredient.id === value)?.name,
                            }}
                            isLoading={ingredients.isLoading}
                            loadOptions={e => handleLoadOptions(e)}
                            defaultOptions={convertIngredientsForSelect()}
                            onCreateOption={e => handleCreateIngredient(e)}
                            onChange={val => onChange(val.value)}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Controller
                    name={`ingredients.${index}.amount`}
                    control={control}
                    rules={{
                      required: 'Amount required',
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextInput
                        label="Ingredient amount"
                        placeholder="Input amount"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      ingredientsRemove(index);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
            : 'Loading...'}
          <div className="mt-8">
            <button
              className="p-2 btn btn-primary"
              type="button"
              onClick={() => {
                ingredientsAppend({
                  id: 0,
                  amount: '',
                });
              }}
            >
              Add ingredient
            </button>
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

export default RecipeForm;
