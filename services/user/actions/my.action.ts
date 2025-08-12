'use server';

import { parseCookie } from '@/utils';
import { headers } from 'next/headers';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

import { IUserAccountModel } from '../model';
import { IMyInfoRes } from '../response';

export interface MyActionResult {
  success: boolean;
  data: IUserAccountModel | null;
}

export const myAction = async (): Promise<MyActionResult> => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  const cookies = parseCookie.set(cookie);
  let access = cookies.pick(ACCESS_TOKEN_NAME);
  const refresh = cookies.pick(REFRESH_TOKEN_NAME);

  try {
    if (!refresh) {
      throw new Error();
    }

    if (!access) {
      const { accessToken } = await KY.post<{ accessToken: string | null }>(`${API_URL}/auth/refresh`, {
        headers: {
          cookie: `${REFRESH_TOKEN_NAME}=${refresh}`,
        },
      }).json();

      if (!accessToken) {
        throw new Error();
      }

      access = accessToken;
    }

    const cookieHeader = [
      access ? `${ACCESS_TOKEN_NAME}=${access}` : '',
      refresh ? `${REFRESH_TOKEN_NAME}=${refresh}` : '',
    ]
      .filter(Boolean)
      .join('; ');

    const { my } = await KY.get<IMyInfoRes>(`${API_URL}/user`, {
      headers: {
        cookie: cookieHeader,
      },
    }).json();

    return { success: true, data: my };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, data: null };
    }

    return { success: false, data: null };
  }
};
