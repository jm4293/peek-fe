import Image from 'next/image';

import { HumanSvg } from '@/asset/svg';

interface IProps {
  thumbnail: string | null;
  w?: number;
}

export const Thumbnail = (props: IProps) => {
  const { thumbnail, w = 40 } = props;

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
        <HumanSvg w={w} />
      )}
    </>
  );
};
