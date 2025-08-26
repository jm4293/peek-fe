'use server';

import { ILoginEmailDto } from '../dto';

export const signinEmailAction = async (dto: ILoginEmailDto) => {
  // const cookieStore = await cookies();
  //
  // try {
  //   await KY.post<ILoginRes>(`${API_URL}/auth/login`, {
  //     json: dto,
  //   }).json();
  //
  // const { accessToken, refreshToken } = ret;
  //
  // cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'lax',
  //   httpOnly: true,
  //   path: '/',
  //   domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
  //   maxAge: ACCESS_TOKEN_COOKIE_TIME,
  // });
  //
  // cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'lax',
  //   httpOnly: true,
  //   path: '/',
  //   domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
  //   maxAge: REFRESH_TOKEN_COOKIE_TIME,
  // });
  //
  //   return { success: true };
  // } catch (error: any) {
  //   return { success: false, message: error?.message || null };
  // }
};
