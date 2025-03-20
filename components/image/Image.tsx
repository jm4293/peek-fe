import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { ImageTypeEnum } from '@/constant/enum';
import { HumanSvg } from '@/asset/svg';

interface IProps {
  src: string;
  type: ImageTypeEnum;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  className?: string;
}

export const Image = (props: IProps) => {
  const { src, type, alt, onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  const image_type = () => {
    switch (type) {
      case ImageTypeEnum.LARGE_LOGO:
        return isMobile ? 300 : 383;
      case ImageTypeEnum.SMALL_LOGO:
        return isMobile ? 200 : 300;
      case ImageTypeEnum.LARGE:
        return isMobile ? 100 : 120;
      case ImageTypeEnum.MEDIUM:
        return isMobile ? 80 : 100;
      case ImageTypeEnum.SMALL:
        return isMobile ? 60 : 80;
      case ImageTypeEnum.THUMBNAIL:
        return isMobile ? 40 : 50;
      default:
        return isMobile ? 80 : 100;
    }
  };

  return src ? (
    <img
      className={`${onClick ? 'cursor-pointer' : ''} ${type === ImageTypeEnum.THUMBNAIL ? 'rounded-3xl' : ''} ${className}`}
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}:${process.env.NEXT_PUBLIC_IMAGE_PORT}${src}`}
      alt={alt}
      width={image_type()}
      height={image_type()}
      onClick={(event) => onClick && onClick(event)}
    />
  ) : (
    <HumanSvg />
  );
};
