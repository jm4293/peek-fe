'use server';

import { cookies, headers } from 'next/headers';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

import { parseCookie } from '@/utils/cookie';

export const signoutAction = async () => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  const cookieStore = parseCookie.set(cookie);
  const access = cookieStore.pick(ACCESS_TOKEN_NAME);
  const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);

  const cookieHeader = [
    access ? `${ACCESS_TOKEN_NAME}=${access}` : '',
    refresh ? `${REFRESH_TOKEN_NAME}=${refresh}` : '',
  ]
    .filter(Boolean)
    .join('; ');

  try {
    await KY.post(`${API_URL}/auth/logout`, {
      headers: {
        cookie: cookieHeader,
      },
    }).json();

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
