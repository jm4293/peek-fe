import createAxiosInstance from '@/lib/axios/axios.config';

import { ImageTypeEnum } from '@/shared/enum/image';

const axios = createAxiosInstance({ 'Content-Type': 'multipart/form-data' });
const baseURL = '/image';

const imageApi = {
  uploadImage: async (dto: { file: File }) => {
    const { file } = dto;

    const formData = new FormData();
    formData.append('image', file);

    return await axios.post<{ name: string }, FormData>({
      url: `${baseURL}/upload`,
      data: formData,
    });
  },

  uploadImages: async (dto: { files: File[] }) => {
    const { files } = dto;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    return await axios.post<{ successUploads: string[]; failUploads: string[] }, FormData>({
      url: `${baseURL}/uploads`,
      data: formData,
    });
  },

  downloadImage: async (dto: { name: string; type: ImageTypeEnum; w?: number; h?: number }) => {
    const { name, w, h } = dto;

    const ret = await axios.get({ url: `${baseURL}/${name}`, params: { w, h } });

    return ret.data;
  },
};

export default imageApi;
