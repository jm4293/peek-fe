import Image from 'next/image';
import { PiUserCircleLight } from 'react-icons/pi';

interface IProps {
  thumbnail: string | null;
  w?: number;
}

export const Thumbnail = (props: IProps) => {
  const { thumbnail, w = 24 } = props;

  return (
    <>
      {thumbnail ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/THUMBNAIL/${thumbnail}`}
          alt="thumbnail"
          width={w}
          height={w}
          className="rounded-full"
        />
      ) : (
        <PiUserCircleLight size={w} />
      )}
    </>
  );
};
