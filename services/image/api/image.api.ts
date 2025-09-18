import axios from 'axios';

import AXIOS from '@/lib/axios';

import { ImageTypeEnum } from '@/shared/enum/image';

class ImageApi extends AXIOS {
  private readonly _baseURL = '/image';

  constructor() {
    super({ 'Content-Type': 'multipart/form-data' });
  }

  async uploadImage(dto: { file: File }) {
    const { file } = dto;

    const formData = new FormData();

    formData.append('image', file);

    const ret = await this.post<{ name: string }, FormData>({ url: `${this._baseURL}/upload`, data: formData });

    return ret.data.name;
  }

  async uploadImages(dto: { files: File[] }) {
    const { files } = dto;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    const ret = await this.post<{ names: string[] }, FormData>({ url: `${this._baseURL}/uploads`, data: formData });

    return ret.data.names;
  }

  async downloadImage(dto: { name: string; type: ImageTypeEnum; w?: number; h?: number }) {
    const { name, w, h } = dto;

    // return `${this._baseURL}/download?name=${name}${width ? `&width=${width}` : ''}`;

    const ret = await this.get({ url: `${this._baseURL}/${name}`, params: { w, h } });

    return ret.data;
  }
}

const imageApi = new ImageApi();

export default imageApi;
