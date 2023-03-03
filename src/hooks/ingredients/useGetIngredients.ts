import { useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { sweetServer } from '@/api/config'

type GetIngredientsParams = {
    search?: string
}

export const useGetIngredients = ({ search }) => {

    const getIngredients = async (search) => {

        const query = qs.stringify(
            {
                search: search
            },
            {
                encodeValuesOnly: true, // prettify URL
            }
        );

        const response = await sweetServer.get(`/ingredients?${query}`)
        return response.data
    }

    const ingredients = useQuery(['ingredients', search], async () => await getIngredients(search), { keepPreviousData: true })

    return ingredients
}