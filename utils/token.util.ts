import { TokenManager } from '@/lib/auth/token-manager';

// Next.js cookies()에서 가져온 토큰을 검증하고 필요시 갱신합니다.
export const getOrRefreshAccessToken = async (
  accessToken: string | undefined,
  refreshToken: string | undefined,
): Promise<string | null> => {
  if (!refreshToken) {
    return null;
  }

  try {
    if (accessToken) {
      return accessToken;
    }

    const newToken = await TokenManager.refreshToken();
    return newToken;
  } catch {
    return null;
  }
};

// 쿠키 문자열에서 토큰을 파싱하고 필요시 갱신합니다.
// export const parseAndRefreshTokensFromCookie = async (cookieString: string | null) => {
//   if (!cookieString) {
//     throw new Error('No cookies');
//   }

//   const cookieStore = CookieUtil.set(cookieString);
//   let access = cookieStore.pick(ACCESS_TOKEN_NAME);
//   const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);

//   if (!refresh) {
//     throw new Error('No refresh token');
//   }

//   // access token이 없으면 TokenManager를 통해 갱신
//   if (!access) {
//     try {
//       access = await TokenManager.refreshToken();
//     } catch {
//       throw new Error('Failed to refresh token');
//     }
//   }

//   // 쿠키 헤더 문자열 생성
//   const cookieParts: string[] = [];
//   cookieParts.push(`${ACCESS_TOKEN_NAME}=${access}`);
//   cookieParts.push(`${REFRESH_TOKEN_NAME}=${refresh}`);
//   const cookieHeader = cookieParts.join('; ');

//   return { access, refresh, cookieHeader };
// };
