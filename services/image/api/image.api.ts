import axios from 'axios';

class ImageApi {
  private readonly _baseURL = '';
  private readonly UPLOAD_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}${this._baseURL}`;
  private readonly DOWNLOAD_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}${this._baseURL}`;

  async uploadImage(dto: { file: File }) {
    const { file } = dto;

    const formData = new FormData();

    formData.append('image', file);

    const ret = await axios.post(this.UPLOAD_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return ret.data.name;
  }

  downloadImage(dto: { name: string; width?: number }) {
    const { name, width } = dto;

    return `${this.DOWNLOAD_URL}?name=${name}${width ? `&width=${width}` : ''}`;
  }
}

const imageApi = new ImageApi();

export default imageApi;
