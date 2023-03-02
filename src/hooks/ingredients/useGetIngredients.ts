import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

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

        const response = await fetch(`http://localhost:5000/ingredients?${query}`)
        return response.json()
    }

    const ingredients = useQuery(['ingredients', search], async () => await getIngredients(search), { keepPreviousData: true })

    return ingredients
}