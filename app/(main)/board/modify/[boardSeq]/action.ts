// 'use server';
//
// import { IUpdateBoardDto } from '@/types/dto';
// import utilFetch from '@/utils/fetch';
// import { ResCodeEnum } from '@/constant/enum';
//
// interface IBody extends IUpdateBoardDto {}
//
// export async function updateBoard(params: { boardSeq: number; formData: FormData }) {
//   const { boardSeq, formData } = params;
//
//   const body: IBody = {
//     title: formData.get('title') as string,
//     content: formData.get('content') as string,
//   };
//
//   const res = await utilFetch({
//     path: `/board/${boardSeq}`,
//     method: 'PUT',
//     body,
//   });
//
//   const json = await res.json();
//
//   if (!res.ok) {
//     return { result: ResCodeEnum.FAIL, message: json.message };
//   }
//
//   return { result: ResCodeEnum.SUCCESS };
// }
