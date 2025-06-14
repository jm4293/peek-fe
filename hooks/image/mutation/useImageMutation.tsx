import { useMutation } from '@tanstack/react-query';

import ImageApi from '@/api/image/image.api';

export const useImageMutation = () => {
    const uploadImageMutation = useMutation({
        mutationFn: (dto: { file: File }) => ImageApi.uploadImage(dto),
    });

    return { uploadImageMutation };
};
