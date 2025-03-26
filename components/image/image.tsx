'use client';

import { ImageTypeEnum } from '@/constant/enum';
import { HumanSvg } from '@/asset/svg';

interface IProps {
  src: string | undefined;
  type: ImageTypeEnum;
  alt: string;
  onClick?: () => void;
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

export default function Image(props: IProps) {
  const { src, type, alt, onClick, className } = props;

  const clickHandler = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return src ? (
    <img
      className={`${onClick ? 'cursor-pointer' : ''} ${type === ImageTypeEnum.THUMBNAIL ? 'rounded-3xl' : ''} ${className}`}
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}${src}`}
      alt={alt}
      width={imageSizes[type].mobile}
      height={imageSizes[type].mobile}
      onClick={(event) => clickHandler(event)}
    />
  ) : (
    <HumanSvg />
  );
}
