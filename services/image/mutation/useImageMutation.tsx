import { useMutation } from '@tanstack/react-query';

import imageApi from '../api/image.api';

export const useImageMutation = () => {
  const uploadImageMutation = useMutation({
    mutationFn: (dto: { file: File }) => imageApi.uploadImage(dto),
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (dto: { files: File[] }) => imageApi.uploadImages(dto),
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
