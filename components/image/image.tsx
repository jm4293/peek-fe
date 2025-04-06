'use client';

import { ImageTypeEnum } from '@/constant/enum';
import { HumanSvg } from '@/asset/svg';
import { useDeviceLayout } from '@/hooks';

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
};

export default function Image(props: IProps) {
  const { src, type, alt, onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  const clickHandler = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return src ? (
    <img
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}${src}`}
      alt={alt}
      width={isMobile ? imageSizes[type].mobile : imageSizes[type].desktop}
      height={isMobile ? imageSizes[type].mobile : imageSizes[type].desktop}
      onClick={(event) => clickHandler(event)}
    />
  ) : (
    <HumanSvg />
  );
}
