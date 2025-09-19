import { CookieUtil } from '@/utils';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

export const getValidTokens = async (cookie: string | null) => {
  const cookieStore = CookieUtil.set(cookie);
  let access = cookieStore.pick(ACCESS_TOKEN_NAME);
  const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);

  if (!refresh) {
    throw new Error('No refresh token');
  }

  if (!access) {
    const { accessToken } = await KY.post<{ accessToken: string | null }>(`${API_URL}/auth/refresh`, {
      headers: {
        cookie: `${REFRESH_TOKEN_NAME}=${refresh}`,
      },
    }).json();

    if (!accessToken) {
      throw new Error('No access token');
    }

    access = accessToken;
  }

  const cookieParts: string[] = [];

  if (access) {
    cookieParts.push(`${ACCESS_TOKEN_NAME}=${access}`);
  }

  if (refresh) {
    cookieParts.push(`${REFRESH_TOKEN_NAME}=${refresh}`);
  }

  const cookieHeader = cookieParts.join('; ');

  return { access, refresh, cookieHeader };
};
