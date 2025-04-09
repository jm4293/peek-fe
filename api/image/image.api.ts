import axios from 'axios';

class ImageApi {
  private readonly _baseURL = '/image';
  private readonly UPLOAD_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}${this._baseURL}/upload`;
  private readonly DOWNLOAD_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}${this._baseURL}/download`;

  async uploadImage(dto: { file: File; width: number; height: number }) {
    const { file, width, height } = dto;

    const formData = new FormData();

    formData.append('image', file);
    formData.append('width', width.toString());
    formData.append('height', height.toString());

    const ret = await axios.post(this.UPLOAD_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    return ret.data.resizedImageUrl;
  }

  downloadImage(path: string) {
    return `${this.DOWNLOAD_URL}${path}`;
  }
}

export default new ImageApi();
