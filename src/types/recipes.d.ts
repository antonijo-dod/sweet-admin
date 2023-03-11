import { Ingredient } from "./ingredient";

type IngredientInRecipe = {
    id: number;
    recipeId: number;
    ingredientId: number;
    amount: number;
    ingredient: Ingredient;
};

type Category = {
    id: number;
    name: string;
    slug: string;
};

type CategoryOnRecipe = {
    categoryId: number;
    recipeId: number;
    category: Category;
};

type Recipe = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    description: string;
    featuredImageId: number;
    preparingTime: number;
    cookingTime: number;
    portions: number;
    authorId: number;
    status: "draft" | "published";
    categories: CategoryOnRecipe[];
    ingredients: IngredientInRecipe[];
};
