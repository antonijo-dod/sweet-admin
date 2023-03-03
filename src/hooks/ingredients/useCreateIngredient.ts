import axios from "axios"
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { IngredientResponse, Ingredient } from '@/types/ingredient'
import { sweetServer } from '@/api/config'

export const useCreateIngredient = () => {
    const queryClient = useQueryClient()

    const postIngredient = async (ingredientData: { name: string }): Promise<IngredientResponse> => {
        const response = await sweetServer.post('/ingredients', { ...ingredientData })
        return response.data
    }

    const createIngredient = useMutation({ mutationFn: async (ingredientData) => await postIngredient(ingredientData), onSuccess: () => queryClient.invalidateQueries('ingredients') })

    return createIngredient
}