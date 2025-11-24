'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import { Wrapper } from '@/components/wrapper';

import { useModal, useToast } from '@/hooks/modal';

import { useImageMutation } from '@/services/image';
import { CreateInquiryReq, createInquiryReqSchema } from '@/services/inquiry';
import { useInquiryMutation } from '@/services/inquiry/mutation/useInquiryMutation';

export default function InquiryRegister() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateInquiryReq>({
    resolver: zodResolver(createInquiryReqSchema),
  });

  const { openToast } = useToast();

  const { uploadImagesMutation } = useImageMutation();
  const { createInquiryMutation } = useInquiryMutation();

  const onSubmit = async (data: CreateInquiryReq) => {
    if (images.length === 0) {
      createInquiryMutation.mutate({ ...data, images: [] });
      return;
    }

    await uploadImagesMutation
      .mutateAsync({ files: images })
      .then((res) => {
        const { successUploads } = res.data;
        createInquiryMutation.mutate({ ...data, images: successUploads });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input label="제목" placeholder="제목" {...register('title')} />
              {errors.title && <Text.PARAGRAPH text={errors.title.message} color="red" />}
            </div>
            <div className="flex flex-col gap-2">
              <Textarea label="내용" placeholder="내용" {...register('content')} />
              {errors.content && <Text.PARAGRAPH text={errors.content.message} color="red" />}
            </div>

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
            <Link href="/inquiry" className="w-full">
              <Button.OUTLINE text="뒤로가기" />
            </Link>
            <Button.CONTAINER text="등록하기" type="submit" disabled={createInquiryMutation.isPending} />
          </div>
        </div>
      </form>
    </Wrapper.SECTION>
  );
}
