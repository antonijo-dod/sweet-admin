import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sweetServer } from '@/api/config'

type TRecipeStatus = {
  recipeId: number
  status: 'published' | 'draft'
}

export const useUpdateRecipeStatus = () => {
  const queryClient = useQueryClient()

  const putRecipeStatus = async (data: TRecipeStatus) => {
    const response = await sweetServer.put(`/recipes/${data.recipeId}/status`, data)
    return response.data
  }

  const recipeStatus = useMutation({
    mutationFn: async (data: TRecipeStatus) => await putRecipeStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  })

  return recipeStatus
}
