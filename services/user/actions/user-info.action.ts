'use server';

import { getValidTokens } from '@/utils';
import { headers } from 'next/headers';

import { API_URL } from '@/shared/constant/api-url';

import { IUserAccountModel } from '../model';

export interface MyAccountActionResult {
  success: boolean;
  data: IUserAccountModel | null;
}

export const userInfoAction = async (): Promise<MyAccountActionResult> => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  try {
    const { cookieHeader } = await getValidTokens(cookie);

    const res = await fetch(`${API_URL}/user`, {
      credentials: 'include',
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const json = await res.json();
    const { myInfo } = json;

    return { success: true, data: myInfo };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
