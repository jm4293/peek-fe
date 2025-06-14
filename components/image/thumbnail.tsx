'use client';

import { useDeviceLayout, useImageMutation, useMyInfo, useUserMutation } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import ImageApi from '@/api/image/image.api';

import { HumanSvg } from '@/asset/svg';

import ThumbnailSkeleton from '@/components/skeleton/thumbnailSkeleton';

interface IProps {
    onClick?: boolean;
}

export default function Thumbnail(props: IProps) {
    const { onClick } = props;

    const { isMobile } = useDeviceLayout();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data, isSuccess } = useMyInfo(true);

    const { uploadImageMutation } = useImageMutation();
    const { updateThumbnailMutation } = useUserMutation();

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            alert('파일을 선택해주세요.');
            return;
        }

        const ret = await uploadImageMutation.mutateAsync({ file });
        updateThumbnailMutation.mutate({ thumbnail: ret });

        event.target.value = '';
    };

    const onClickHandler = () => {
        if (onClick) {
            console.log('inputRef', inputRef.current);
            inputRef.current?.click();
        }
    };

    console.log('data', data);

    if (!isSuccess) {
        return <ThumbnailSkeleton />;
    }

    return (
        <>
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png"
                onChange={onFileChange}
            />
            {data.user.thumbnail ? (
                <div onClick={onClickHandler}>
                    <img
                        src={`${ImageApi.downloadImage({ name: data.user.thumbnail, width: isMobile ? 60 : 80 })}`}
                        alt="thumbnail"
                        width={isMobile ? 60 : 80}
                        height={isMobile ? 60 : 80}
                    />
                </div>
            ) : (
                <div onClick={onClickHandler}>
                    <HumanSvg />
                </div>
            )}
        </>
    );
}
