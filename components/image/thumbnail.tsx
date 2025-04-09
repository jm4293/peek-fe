'use client';

import { HumanSvg } from '@/asset/svg';
import { useDeviceLayout, useImageMutation, useMyInfoQuery } from '@/hooks';
import { useRef } from 'react';
import ThumbnailSkeleton from '@/components/skeleton/thumbnailSkeleton';
import ImageApi from '@/api/image/image.api';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  onClick?: boolean;
  className?: string;
}

export default function Thumbnail(props: IProps) {
  const { onClick, className } = props;

  const queryClient = useQueryClient();
  const { isMobile } = useDeviceLayout();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, isSuccess } = useMyInfoQuery();

  const { uploadImageMutation } = useImageMutation();

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    await uploadImageMutation.mutateAsync({ file, width: 100, height: 100 });

    await queryClient.refetchQueries({ queryKey: ['my-info'] });

    event.target.value = '';
  };

  const onClickHandler = () => {
    if (onClick) {
      inputRef.current?.click();
    }
  };

  if (!isSuccess) {
    return <ThumbnailSkeleton />;
  }

  return data?.thumbnail ? (
    <div>
      <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={onFileChange} />
      <img
        className={`rounded-3xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
        src={`${ImageApi.downloadImage(data.thumbnail)}`}
        alt="thumbnail"
        width={isMobile ? 60 : 80}
        height={isMobile ? 60 : 80}
        onClick={onClickHandler}
      />
    </div>
  ) : (
    <HumanSvg />
  );
}
