import { useMutation } from '@tanstack/react-query';

import ImageApi from '@/services/image';

export const useImageMutation = () => {
  const uploadImageMutation = useMutation({
    mutationFn: (dto: { file: File }) => ImageApi.uploadImage(dto),
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (dto: { files: File[] }) => ImageApi.uploadImages(dto),
    onSuccess: (data) => {
      const { successUploads, failUploads } = data.data;

      return { successUploads, failUploads };
    },
  });

  return {
    uploadImageMutation,
    uploadImagesMutation,
  };
};
