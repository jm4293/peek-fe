import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const UPLOAD_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}/${process.env.NEXT_PUBLIC_IMAGE_PREFIX}`;
const IMAGE_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}`;

export const useImageMutation = () => {
  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();

      formData.append('image', file);

      return axios.post(UPLOAD_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: (response) => {
      const ret = `${IMAGE_URL}${response.data.resizedImageUrl}`;

      console.log('업로드 성공:', ret);
    },
    onError: (error) => {
      console.error('이미지 업로드 중 오류가 발생했습니다.', error);
    },
  });

  return { uploadImageMutation };
};
