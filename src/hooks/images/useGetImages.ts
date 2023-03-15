import { useQuery } from '@tanstack/react-query';
import { sweetServer } from '@/api/config';

export const useGetImages = () => {
    const getImages = async () => {
        const response = await sweetServer.get('/images');
        return response.data;
    };

    const images = useQuery(['images'], async () => await getImages());
    return images;
};
