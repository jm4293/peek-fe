import { useMutation } from '@tanstack/react-query';

import ImageApi from '@/services/image';

export const useImageMutation = () => {
  const uploadImageMutation = useMutation({
    mutationFn: (dto: { file: File }) => ImageApi.uploadImage(dto),
  });

  return { uploadImageMutation };
};
