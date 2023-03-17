import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sweetServer } from '@/api/config';

export const useUploadImages = () => {
    const queryClient = useQueryClient();

    sweetServer.interceptors.request.use(
        config => {
            config.headers['content-type'] = 'multipart/form-data';
            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const postImages = async data => {
        const response = await sweetServer.post('/images', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    };

    const uploadImages = useMutation({
        mutationFn: async data => await postImages(data),
        onSuccess: () => {
            queryClient.invalidateQueries('images');
        },
    });
    return uploadImages;
};
