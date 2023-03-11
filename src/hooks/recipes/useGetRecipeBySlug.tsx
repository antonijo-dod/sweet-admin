import { useQuery } from "@tanstack/react-query";
import { sweetServer } from "@/api/config";
import { RecipeResponse } from "@/types/recipes";

export const useGetRecipeBySlug = (slug: string) => {
    const getRecipe = async (): Promise<RecipeResponse> => {
        const response = await sweetServer.get(`recipes/${slug}`);
        return response.data;
    };

    const recipe = useQuery(["recipe", slug], async () => getRecipe());
    return recipe;
};
