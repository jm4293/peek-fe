'use server';

import { ICreateBoardDto } from '@/types/dto';
import utilFetch from '@/utils/fetch';
import { ResCodeEnum } from '@/constant/enum';

interface IBody extends ICreateBoardDto {}

export async function registerBoard(formData: FormData) {
  const body: IBody = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const res = await utilFetch({
    path: '/board',
    method: 'POST',
    body,
  });

  const json = await res.json();

  if (!res.ok) {
    return { result: ResCodeEnum.FAIL, message: json.message };
  }

  return { result: ResCodeEnum.SUCCESS };
}
