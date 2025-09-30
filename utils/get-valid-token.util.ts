import { CookieUtil } from '@/utils';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

export const getValidTokens = async (cookie: string | null) => {
  if (!cookie) {
    throw new Error('No cookies');
  }

  const cookieStore = CookieUtil.set(cookie);
  let access = cookieStore.pick(ACCESS_TOKEN_NAME);
  const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);

  if (!refresh) {
    throw new Error('No refresh token');
  }

  if (!access) {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: `${REFRESH_TOKEN_NAME}=${refresh}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to refresh token');
    }

    const { accessToken } = await res.json();

    if (!accessToken) {
      throw new Error('No access token');
    }

    access = accessToken;
  }

  const cookieParts: string[] = [];
  cookieParts.push(`${ACCESS_TOKEN_NAME}=${access}`);
  cookieParts.push(`${REFRESH_TOKEN_NAME}=${refresh}`);
  const cookieHeader = cookieParts.join('; ');

  return { access, refresh, cookieHeader };
};
