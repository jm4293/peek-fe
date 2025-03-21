'use server';

import { HumanSvg } from '@/asset/svg';
import { ImageTypeEnum } from '@/constant/enum';

interface IProps {
  src: string;
  type: ImageTypeEnum;
  alt: string;
  className?: string;
}

const imageSizes = {
  [ImageTypeEnum.LARGE_LOGO]: { mobile: 300, desktop: 383 },
  [ImageTypeEnum.SMALL_LOGO]: { mobile: 200, desktop: 300 },
  [ImageTypeEnum.LARGE]: { mobile: 100, desktop: 120 },
  [ImageTypeEnum.MEDIUM]: { mobile: 80, desktop: 100 },
  [ImageTypeEnum.SMALL]: { mobile: 60, desktop: 80 },
  [ImageTypeEnum.THUMBNAIL]: { mobile: 40, desktop: 50 },
};

export default async function ImageServer(props: IProps) {
  const { src, type, alt, className } = props;

  return src ? (
    <img
      className={`${type === ImageTypeEnum.THUMBNAIL ? 'rounded-3xl' : ''} ${className}`}
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}${src}`}
      alt={alt}
      width={imageSizes[type].mobile}
      height={imageSizes[type].mobile}
    />
  ) : (
    <HumanSvg />
  );
}
