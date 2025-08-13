// 'use client';

// import { useDeviceLayout } from '@/hooks';
// import { useRef } from 'react';

// import { HumanSvg } from '@/asset/svg';

// import ThumbnailSkeleton from '@/components/skeleton/thumbnailSkeleton';

// import { useImageMutation } from '@/services/image';
// import ImageApi from '@/services/image/api/image.api';
// import { useMyInfo, useUserMutation } from '@/services/user';

// interface IProps {
//   onClick?: boolean;
// }

// export const Thumbnail = (props: IProps) => {
//   const { onClick } = props;

//   const { isMobile } = useDeviceLayout();

//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const { data, isSuccess } = useMyInfo();

//   const { uploadImageMutation } = useImageMutation();
//   const { updateThumbnailMutation } = useUserMutation();

//   const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       alert('파일을 선택해주세요.');
//       return;
//     }

//     const ret = await uploadImageMutation.mutateAsync({ file });
//     updateThumbnailMutation.mutate({ thumbnail: ret });

//     event.target.value = '';
//   };

//   const onClickHandler = () => {
//     if (onClick) {
//       inputRef.current?.click();
//     }
//   };

//   if (!isSuccess) {
//     return <ThumbnailSkeleton />;
//   }

//   return (
//     <>
//       <input type="file" ref={inputRef} style={{ display: 'none' }} accept=".jpg,.jpeg,.png" onChange={onFileChange} />
//       {data.user.thumbnail ? (
//         <div onClick={onClickHandler}>
//           <img
//             src={`${ImageApi.downloadImage({ name: data.user.thumbnail, width: isMobile ? 60 : 80 })}`}
//             alt="thumbnail"
//             width={isMobile ? 60 : 80}
//             height={isMobile ? 60 : 80}
//           />
//         </div>
//       ) : (
//         <div onClick={onClickHandler}>
//           <HumanSvg />
//         </div>
//       )}
//     </>
//   );
// };
