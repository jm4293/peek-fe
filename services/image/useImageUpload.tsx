import axios from 'axios';
import { ChangeEvent, JSX, useRef, useState } from 'react';

interface UseFileUploadReturn {
  FileUploadButton: () => JSX.Element;
  responseURL: string;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const uploadUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}/${process.env.NEXT_PUBLIC_IMAGE_PREFIX}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}`;

  const [responseURL, setResponseURL] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (event.target.files) {
      await handleUpload(event.target.files[0]);
    }
  };

  const handleUpload = async (file: File): Promise<void> => {
    const formData = new FormData();

    formData.append('image', file);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const resizedImageUrl = `${imageUrl}${response.data.resizedImageUrl}`;

      setResponseURL(resizedImageUrl);
    } catch (error: unknown) {}
  };

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const FileUploadButton = (): JSX.Element => (
    <div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <button onClick={handleButtonClick}>이미지 선택</button>
    </div>
  );

  const uploadImage = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return `${imageUrl}${response.data.resizedImageUrl}`;
    } catch (error: unknown) {
      return undefined;
    }
  };

  return {
    FileUploadButton,
    responseURL,
  };
};
