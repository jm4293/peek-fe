'use server';

import { ILoginEmailDto } from '@/types/dto';
import utilFetch from '@/utils/fetch';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE_TIME, REFRESH_TOKEN_COOKIE_TIME } from '@/constant/expire-time';
import { ResCodeEnum } from '@/constant/enum';
import { redirect } from 'next/navigation';

interface IBody extends ILoginEmailDto {}

export async function login(formData: FormData) {
  const body: IBody = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const res = await utilFetch({
    path: '/auth/login-email',
    method: 'POST',
    body,
  });

  const json = await res.json();

  if (!res.ok) {
    return { result: ResCodeEnum.FAIL, message: json.message };
  }

  const { accessToken, refreshToken } = json.data;

  const cookieStore = await cookies();

  cookieStore.set('RT', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_COOKIE_TIME,
  });

  return { result: ResCodeEnum.SUCCESS, accessToken };
}
