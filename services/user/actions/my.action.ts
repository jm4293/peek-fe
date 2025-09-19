'use server';

import { getValidTokens } from '@/utils';
import { headers } from 'next/headers';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { IUserAccountModel } from '../model';
import { IMyInfoRes } from '../response';

export interface MyActionResult {
  success: boolean;
  data: IUserAccountModel | null;
}

export const myAction = async (): Promise<MyActionResult> => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  try {
    const { cookieHeader } = await getValidTokens(cookie);

    const { my } = await KY.get<IMyInfoRes>(`${API_URL}/user`, {
      headers: {
        cookie: cookieHeader,
      },
    }).json();

    return { success: true, data: my };
  } catch (error: any) {
    return { success: false, data: null };
  }
};
