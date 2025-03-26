'use server';

import { ILoginOauthDto } from '@/types/dto';
import { ResCodeEnum, UserAccountTypeEnum } from '@/constant/enum';
import utilFetch from '@/utils/fetch';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE_TIME, REFRESH_TOKEN_COOKIE_TIME } from '@/constant/expire-time';
import { redirect } from 'next/navigation';

interface IBody extends ILoginOauthDto {}

export async function loginGoogle(access_token: string) {
  const body: IBody = {
    access_token,
    userAccountType: UserAccountTypeEnum.GOOGLE,
  };

  const res = await utilFetch({
    path: '/auth/login-oauth',
    method: 'POST',
    body,
  });

  const json = await res.json();

  if (!res.ok) {
    redirect('/auth/login');
    return { result: ResCodeEnum.FAIL, message: json.message };
  }

  const { accessToken, refreshToken } = json.data;

  const cookieStore = await cookies();

  cookieStore.set('AT', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: ACCESS_TOKEN_COOKIE_TIME,
  });

  cookieStore.set('RT', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_COOKIE_TIME,
  });

  return redirect('/user');
}
