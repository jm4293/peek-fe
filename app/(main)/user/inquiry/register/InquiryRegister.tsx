'use client';

import { ValidationUtil } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import { Wrapper } from '@/components/wrapper';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { useImageMutation } from '@/services/image';
import { ICreateInquiryDto } from '@/services/inquiry';
import { useInquiryMutation } from '@/services/inquiry/mutation/useInquiryMutation';

const initialFormData: ICreateInquiryDto = {
  title: '',
  content: '',
  images: [],
};

export default function InquiryRegister() {
  const router = useRouter();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const [value, onChange] = useInput<ICreateInquiryDto>({ ...initialFormData });

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const { uploadImagesMutation } = useImageMutation();
  const { createInquiryMutation } = useInquiryMutation();

  const clickHandler = async () => {
    const isValid = ValidationUtil.create()
      .required(value.title, '제목을 입력해주세요.')
      .required(value.content, '내용을 입력해주세요.')
      .minLength(value.title, 1, '제목은 최소 1글자 이상이어야 합니다')
      .minLength(value.content, 10, '내용은 최소 10글자 이상이어야 합니다')
      .validate((errorMessage) => {
        openModal({ content: errorMessage, onConfirm: closeModal });
      });

    if (!isValid) {
      return;
    }

    if (images.length === 0) {
      createInquiryMutation.mutate({ ...value, images: [] });
      return;
    }

    await uploadImagesMutation
      .mutateAsync({ files: images })
      .then((res) => {
        const { successUploads } = res.data;

        createInquiryMutation.mutate({ ...value, images: successUploads });
      })
      .catch(() => {
        openToast({ message: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.', type: 'error' });
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const fileArray = Array.from(files).slice(0, 5 - images.length);
    setImages((prevImages) => [...prevImages, ...fileArray]);

    e.target.value = '';
  };

  const handleImageUpload = () => {
    if (!imageInputRef.current) {
      return;
    }

    imageInputRef.current.click();
  };

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Input title="제목" name="title" value={value.title} onChange={onChange} placeholder="제목" required />
          <Textarea title="내용" name="content" value={value.content} onChange={onChange} placeholder="내용" required />

          <div className="flex flex-col gap-2">
            <Text.HEADING text="이미지" />
            {images.length > 0 ? (
              <div className="flex gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => setImages((prevImages) => prevImages.filter((img) => img !== file))}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <Text.PARAGRAPH text="이미지는 최대 5장까지 등록할 수 있습니다." />
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <Button.CONTAINER text="이미지 등록" onClick={handleImageUpload} disabled={images.length === 5} />
          </div>
        </div>

        <div className="w-full flex gap-2">
          <Link href="/user/inquiry" className="w-full">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER text="등록하기" onClick={clickHandler} disabled={createInquiryMutation.isPending} />
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
