import { sweetServer } from '@/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TCategory = {
    name: string;
    string: string;
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const postCategory = async (data: TCategory) => {
        const response = await sweetServer.post('/categories', data);
        return response.data;
    };

    const createCategory = useMutation({
        mutationFn: async (data: TCategory) => await postCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    });
    return createCategory;
};
