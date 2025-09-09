import { CircleUser } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  thumbnail: string | null;
  size?: number;
}

export const Thumbnail = (props: IProps) => {
  const { thumbnail, size = 24 } = props;

  return (
    <>
      {thumbnail ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/THUMBNAIL/${thumbnail}`}
          alt="thumbnail"
          width={size}
          height={size}
          className="rounded-full"
        />
      ) : (
        <CircleUser size={size} />
      )}
    </>
  );
};
