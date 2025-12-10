import { CookieUtil } from '@/utils';

import { TokenManager } from '@/lib/auth/token-manager';

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

/**
 * Next.js cookies()에서 가져온 토큰을 검증하고 필요시 갱신합니다.
 *
 * @param accessToken - access token (선택)
 * @param refreshToken - refresh token (필수)
 * @returns 유효한 access token 또는 null
 *
 * @example
 * ```typescript
 * const cookieStore = await cookies();
 * const tkn = cookieStore.get('access_token');
 * const rtkn = cookieStore.get('refresh_token');
 *
 * const validToken = await getOrRefreshAccessToken(tkn?.value, rtkn?.value);
 * ```
 */
export const getOrRefreshAccessToken = async (
  accessToken: string | undefined,
  refreshToken: string | undefined,
): Promise<string | null> => {
  if (!refreshToken) {
    return null;
  }

  try {
    // access token이 이미 있으면 그대로 반환
    if (accessToken) {
      return accessToken;
    }

    // access token이 없으면 TokenManager를 통해 갱신
    const newToken = await TokenManager.refreshToken();
    return newToken;
  } catch {
    return null;
  }
};

/**
 * 쿠키 문자열에서 토큰을 파싱하고 필요시 갱신합니다.
 *
 * @param cookieString - 쿠키 문자열 (예: "access_token=xxx; refresh_token=yyy")
 * @returns access token, refresh token, 쿠키 헤더 문자열
 * @throws 쿠키가 없거나 refresh token이 없는 경우
 *
 * @example
 * ```typescript
 * const headerList = await headers();
 * const cookie = headerList.get('cookie');
 *
 * const { access, refresh, cookieHeader } = await parseAndRefreshTokensFromCookie(cookie);
 *
 * // API 호출 시 사용
 * await fetch('/api/data', {
 *   headers: { cookie: cookieHeader }
 * });
 * ```
 */
export const parseAndRefreshTokensFromCookie = async (cookieString: string | null) => {
  if (!cookieString) {
    throw new Error('No cookies');
  }

  const cookieStore = CookieUtil.set(cookieString);
  let access = cookieStore.pick(ACCESS_TOKEN_NAME);
  const refresh = cookieStore.pick(REFRESH_TOKEN_NAME);

  if (!refresh) {
    throw new Error('No refresh token');
  }

  // access token이 없으면 TokenManager를 통해 갱신
  if (!access) {
    try {
      access = await TokenManager.refreshToken();
    } catch {
      throw new Error('Failed to refresh token');
    }
  }

  // 쿠키 헤더 문자열 생성
  const cookieParts: string[] = [];
  cookieParts.push(`${ACCESS_TOKEN_NAME}=${access}`);
  cookieParts.push(`${REFRESH_TOKEN_NAME}=${refresh}`);
  const cookieHeader = cookieParts.join('; ');

  return { access, refresh, cookieHeader };
};
