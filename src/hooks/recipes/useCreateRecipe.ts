import { sweetServer } from '@/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TRecipe = {
  name: string;
  description: string;
  ingredients: string[];
  featuredImageId: number;
  galleryImageIds: number[];
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  const postRecipe = async (data: TRecipe) => {
    const response = await sweetServer.post('/recipes', data);
    return response.data;
  };

  const createRecipe = useMutation({
    mutationFn: async (data: TRecipe) => await postRecipe(data),
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
  return createRecipe;
};
