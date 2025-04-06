'use client';

import { HumanSvg } from '@/asset/svg';
import { useDeviceLayout, useImageMutation } from '@/hooks';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  src: string | undefined;
  onClick?: boolean;
  className?: string;
}

export default function Thumbnail(props: IProps) {
  const { src, onClick, className } = props;

  const { isMobile } = useDeviceLayout();
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { uploadImageMutation } = useImageMutation();

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();

      formData.append('image', file);

      uploadImageMutation.mutate(file);

      await queryClient.refetchQueries({ queryKey: ['user-my-info'] });
    }
  };

  const onClickHandler = () => {
    if (onClick) {
      inputRef.current?.click();
    }
  };

  return src ? (
    <>
      <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={onFileChange} />
      <img
        className={`cursor-pointer rounded-3xl ${className}`}
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}${src}`}
        alt="thumbnail"
        width={isMobile ? 40 : 50}
        height={isMobile ? 40 : 50}
        onClick={onClickHandler}
      />
    </>
  ) : (
    <HumanSvg />
  );
}
