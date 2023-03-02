import axios from "axios"
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { IngredientResponse, Ingredient } from '@/types/ingredient'

export const useCreateIngredient = () => {
    const queryClient = useQueryClient()

    const postIngredient = async (ingredientData: { name: string }): Promise<IngredientResponse> => {
        const { data } = await axios.post(
            'http://localhost:5000/ingredients', { ...ingredientData }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3NzQ5MzY4LCJleHAiOjE2Nzc3NTI5Njh9.JePZABgiT37cy-fADqEsMenWtW_ejHSD5d5OoGHntBo'
            }
        }
        )
        return data
    }

    const createIngredient = useMutation({ mutationFn: async (ingredientData) => await postIngredient(ingredientData), onSuccess: () => queryClient.invalidateQueries('ingredients') })

    return createIngredient
}