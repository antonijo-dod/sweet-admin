import { ReactElement, useState, useEffect } from "react";
import { FeaturedImageUpload, SingleUploadImage } from "@/components";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useGetIngredients, useCreateIngredient } from "@/hooks/ingredients";
import AsyncCreatableSelect from "react-select/async-creatable";

type TFormValues = {
    name: string;
    slug: string;
    description: string;
    categories: number[];
    galleryImages: number[];
    ingredients: { id: number; amount: string }[];
};

type TRecipeFormProps = {
    onFormSubmit: (data: TFormValues) => void;
    defaultData?: TFormValues;
};

const RecipeForm = ({
    onFormSubmit,
    defaultData,
}: TRecipeFormProps): ReactElement => {
    const [searchIngredients, setSearchIngredients] = useState<string>("");

    const ingredients = useGetIngredients({ search: searchIngredients });
    const createIngredient = useCreateIngredient();

    const {
        handleSubmit,
        control,
        register,
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
        console.log("🚀 ~ file: RecipeForm.tsx:50 ~ onSubmit ~ data:", data);
        onFormSubmit(data);
    };

    const convertIngredientsForSelect = () => {
        const ingredientsData = ingredients.data?.data.map((ingredient) => {
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
                onSuccess: (data) => {
                    console.log(
                        "🚀 ~ file: RecipeForm.tsx:72 ~ await createIngredient.mutate ~ data:",
                        data
                    );
                },
            }
        );
    };

    const handleLoadOptions = async (inputValue: string) => {
        setSearchIngredients(inputValue);
        return convertIngredientsForSelect();
    };

    const categoryOptions = [
        { value: "1", label: "Breakfast" },
        { value: "2", label: "Nesto drugo" },
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 divide-y divide-gray-200"
        >
            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Info about your recipe
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Fill all the fields to create a new recipe.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="title"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register("name", {
                                        required: "Naziv recepta je obavezan",
                                    })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="slug"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Slug
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="slug"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register("slug", {
                                        required: "Naziv recepta je obavezan",
                                    })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    rows={3}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register("description", {
                                        required: "Naziv recepta je obavezan",
                                    })}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Write a few sentences about recipe.
                            </p>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="categories"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Categories
                            </label>
                            <div className="mt-1">
                                <Controller
                                    control={control}
                                    name="categories"
                                    render={({
                                        field: { onChange, value, name, ref },
                                    }) => (
                                        <Select
                                            isMulti
                                            name="colors"
                                            ref={ref}
                                            options={categoryOptions}
                                            onChange={(val) =>
                                                onChange(
                                                    val.map((v) =>
                                                        Number(v.value)
                                                    )
                                                )
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="preparing_time"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Preparing time
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="prep"
                                    id="prep"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="cook_time"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Cook time
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="cook_time"
                                    id="cook_time"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="portions"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Portions
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="portions"
                                    id="portions"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="col-span-6">
                            <label
                                htmlFor="featured-image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Featured image
                            </label>
                            <Controller
                                name="featuredImageId"
                                control={control}
                                rules={{
                                    required: "Odaberi sliku",
                                }}
                                render={({ field: { ref, ...rest } }) => (
                                    <SingleUploadImage {...rest} />
                                )}
                            />
                        </div>

                        <div className="col-span-6">
                            <label
                                htmlFor="featured-image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Gallery images
                            </label>
                            <Controller
                                name="galleryImages"
                                control={control}
                                rules={{
                                    required: "Odaberi slike",
                                }}
                                render={({ field: { ref, ...rest } }) => (
                                    <FeaturedImageUpload {...rest} />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Ingredients
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Write recipe ingredients.
                        </p>
                    </div>
                    {/* ROW */}

                    {!ingredients.isLoading && ingredients.data
                        ? ingredientsFields.map((field, index) => (
                              <div
                                  className="mt-6 grid grid-cols-12 gap-y-6 gap-x-4 sm:grid-cols-6"
                                  key={field.id}
                              >
                                  <div>
                                      <label
                                          htmlFor="title"
                                          className="block text-sm font-medium text-gray-700"
                                      >
                                          Name
                                      </label>
                                      <div className="mt-1">
                                          <Controller
                                              control={control}
                                              name={
                                                  `ingredients.${index}.id` as const
                                              }
                                              render={({
                                                  field: {
                                                      onChange,
                                                      value,
                                                      ref,
                                                  },
                                              }) => {
                                                  return (
                                                      <AsyncCreatableSelect
                                                          ref={ref}
                                                          cacheOptions
                                                          defaultValue={{
                                                              value: value,
                                                              label: ingredients.data.data.find(
                                                                  (
                                                                      ingredient
                                                                  ) =>
                                                                      ingredient.id ===
                                                                      value
                                                              )?.name,
                                                          }}
                                                          isLoading={
                                                              ingredients.isLoading
                                                          }
                                                          loadOptions={(e) =>
                                                              handleLoadOptions(
                                                                  e
                                                              )
                                                          }
                                                          defaultOptions={convertIngredientsForSelect()}
                                                          onCreateOption={(e) =>
                                                              handleCreateIngredient(
                                                                  e
                                                              )
                                                          }
                                                          onChange={(val) =>
                                                              onChange(
                                                                  val.value
                                                              )
                                                          }
                                                      />
                                                  );
                                              }}
                                          />
                                      </div>
                                  </div>
                                  <div>
                                      <label
                                          htmlFor="amount"
                                          className="block text-sm font-medium text-gray-700"
                                      >
                                          Amount
                                      </label>
                                      <div className="mt-1">
                                          <input
                                              type="text"
                                              id="amount"
                                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                              {...register(
                                                  `ingredients.${index}.amount` as const,
                                                  {
                                                      required:
                                                          "This is required",
                                                  }
                                              )}
                                          />
                                      </div>
                                  </div>
                                  <div className="mt-8">
                                      <button
                                          className="p-2 bg-blue-500"
                                          onClick={() => {
                                              ingredientsRemove(index);
                                          }}
                                      >
                                          Remove
                                      </button>
                                  </div>
                              </div>
                          ))
                        : "Loading..."}
                    <div className="mt-8">
                        <button
                            className="p-2 bg-blue-500"
                            type="button"
                            onClick={() => {
                                ingredientsAppend({
                                    id: 0,
                                    amount: "",
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
