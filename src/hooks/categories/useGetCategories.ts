import { useQuery } from '@tanstack/react-query';
import { sweetServer } from '@/api/config';
import qs from 'qs';
import { TCategories } from '@/types/categories';

type TGetCategoriesParams = {
    page?: number;
};

export const useGetCategories = ({ page }: TGetCategoriesParams) => {
    const getCategories = async (): Promise<TCategories> => {
        const query = qs.stringify(
            {
                page,
            },
            {
                encodeValuesOnly: true, // prettify URL
            },
        );

        const response = await sweetServer.get(`/categories?${query}`);
        return response.data;
    };

    const categories = useQuery(['categories', page], async () => await getCategories(), {
        keepPreviousData: true,
    });
    return categories;
};
