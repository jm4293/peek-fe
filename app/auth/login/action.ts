'use server';

import { ILoginEmailDto } from '@/types/dto';
import utilFetch from '@/utils/fetch';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE_TIME, REFRESH_TOKEN_COOKIE_TIME } from '@/constant/expire-time';

interface IBody extends ILoginEmailDto {}

export async function login(prevState: any, formData: FormData) {
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
    return { message: json.message };
  }

  const cookieStore = await cookies();

  cookieStore.set('AT', json.data.accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: ACCESS_TOKEN_COOKIE_TIME,
  });

  cookieStore.set('RT', json.data.refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_COOKIE_TIME,
  });

  return redirect('/home');
}
