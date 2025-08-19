'use server';

import { cookies } from 'next/headers';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';
import { ACCESS_TOKEN_COOKIE_TIME, REFRESH_TOKEN_COOKIE_TIME } from '@/shared/constant/expire-time';

import { ILoginOauthDto } from '../dto';
import { ILoginRes } from '../response';

export const signinOauthAction = async (dto: ILoginOauthDto) => {
  const cookieStore = await cookies();

  try {
    const ret = await KY.post<ILoginRes>(`${API_URL}/auth/login/oauth`, {
      json: dto,
    }).json();

    const { accessToken, refreshToken } = ret;

    cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
      maxAge: ACCESS_TOKEN_COOKIE_TIME,
    });

    cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
      maxAge: REFRESH_TOKEN_COOKIE_TIME,
    });

    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
};
