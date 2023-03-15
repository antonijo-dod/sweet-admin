import { sweetServer } from '@/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();

    const deleteRecipe = async (id: number) => {
        const response = await sweetServer.delete(`/recipes/${id}`);
        return response.data;
    };

    const recipe = useMutation({
        mutationFn: async (id: number) => await deleteRecipe(id),
        onSuccess: () => {
            queryClient.invalidateQueries('recipes');
        },
    });

    return recipe;
};
