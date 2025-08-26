'use server';

import { ILoginOauthDto } from '../dto';

export const signinOauthAction = async (dto: ILoginOauthDto) => {
  // const cookieStore = await cookies();
  //
  // try {
  //   const ret = await KY.post<ILoginRes>(`${API_URL}/auth/login/oauth`, {
  //     json: dto,
  //   }).json();
  //
  //   const { accessToken, refreshToken } = ret;
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
  // } catch (error: unknown) {
  //   return { success: false };
  // }
};
