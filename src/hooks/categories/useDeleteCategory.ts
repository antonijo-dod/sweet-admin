import { sweetServer } from '@/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    const deleteCategory = async (id: number) => {
        const response = await sweetServer.delete(`/categories/${id}`);
        return response.data;
    };

    const category = useMutation({
        mutationFn: async (id: number) => await deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    });

    return category;
};
