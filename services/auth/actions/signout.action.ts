'use server';

export const signoutAction = async () => {
  // const headerList = await headers();
  // const cookie = headerList.get('cookie');
  //
  // const cookieStore = parseCookieUtil.set(cookie);
  // let access = cookieStore.pick(ACCESS_TOKEN_NAME);
  // const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);
  //
  // try {
  //   if (!refresh) {
  //     throw new Error();
  //   }
  //
  //   if (!access) {
  //     const { accessToken } = await KY.post<{ accessToken: string | null }>(`${API_URL}/auth/refresh`, {
  //       headers: {
  //         cookie: `${REFRESH_TOKEN_NAME}=${refresh}`,
  //       },
  //     }).json();
  //
  //     if (!accessToken) {
  //       throw new Error();
  //     }
  //
  //     access = accessToken;
  //   }
  //
  // const cookieHeader = [
  //     access ? `${ACCESS_TOKEN_NAME}=${access}` : '',
  //     refresh ? `${REFRESH_TOKEN_NAME}=${refresh}` : '',
  //   ]
  //     .filter(Boolean)
  //     .join('; ');
  //
  //   await KY.post(`${API_URL}/auth/logout`, {
  //     headers: {
  //       cookie: cookieHeader,
  //     },
  //   }).json();
  //
  //   (await cookies()).delete({
  //     name: ACCESS_TOKEN_NAME,
  //     path: '/',
  //     domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
  //   });
  //   (await cookies()).delete({
  //     name: REFRESH_TOKEN_NAME,
  //     path: '/',
  //     domain: process.env.NODE_ENV === 'production' ? '.peek.run' : 'localhost',
  //   });
  //
  //   return { success: true };
  // } catch (error: unknown) {
  //   return { success: false };
  // }
};
