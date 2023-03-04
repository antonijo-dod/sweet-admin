import { useQuery } from '@tanstack/react-query'
import { sweetServer } from '@/api/config'
import qs from 'qs'

type TGetRecipesParams = {
    page?: number,
}

export const useGetRecipes = ({ page }: TGetRecipesParams) => {
    const getRecipes = async () => {

        const query = qs.stringify(
            {
                page
            },
            {
                encodeValuesOnly: true, // prettify URL
            }
        );

        const response = await sweetServer.get(`/recipes?${query}`)
        return response.data
    }

    const recipes = useQuery(['recipes', page], async () => await getRecipes(), { keepPreviousData: true })
    return recipes

}