'use server';

import { CookieUtil } from '@/utils';
import { cookies, headers } from 'next/headers';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

export const withdrawAction = async () => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  const cookieStore = CookieUtil.set(cookie);
  const access = cookieStore.pick(ACCESS_TOKEN_NAME);
  const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);

  const cookieHeader = [
    access ? `${ACCESS_TOKEN_NAME}=${access}` : '',
    refresh ? `${REFRESH_TOKEN_NAME}=${refresh}` : '',
  ]
    .filter(Boolean)
    .join('; ');

  try {
    await KY.delete(`${API_URL}/user`, {
      headers: {
        cookie: cookieHeader,
      },
    });

    (await cookies()).delete({
      name: ACCESS_TOKEN_NAME,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
    });
    (await cookies()).delete({
      name: REFRESH_TOKEN_NAME,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
    });

    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
};
