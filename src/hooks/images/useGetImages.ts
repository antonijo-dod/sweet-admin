import { useQuery } from '@tanstack/react-query';
import { sweetServer } from '@/api/config';
import qs from 'qs';

type TGetImagesProps = {
    page?: number;
};

export const useGetImages = ({ page }: TGetImagesProps) => {
    const getImages = async () => {
        const query = qs.stringify(
            {
                page,
            },
            {
                encodeValuesOnly: true, // prettify URL
            },
        );

        const response = await sweetServer.get(`/images?${query}`);
        return response.data;
    };

    const images = useQuery(['images', page], async () => await getImages(), {
        keepPreviousData: true,
    });
    return images;
};
