import { LocalStorageUtil, SessionStorageUtil } from '@/utils';
import axios from 'axios';

import { API_URL } from '@/shared/constant/api-url';
import { REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

/**
 * 중앙화된 인증 관리 클래스
 *
 * 클라이언트(axios)와 서버(fetch) 모두에서 사용 가능한 통합 인증 유틸리티입니다.
 * 토큰 갱신, 에러 처리, 로그아웃을 중앙에서 관리합니다.
 */
export class TokenManager {
  /**
   * 환경에 따라 적절한 방법으로 토큰을 갱신합니다.
   *
   * @returns 갱신된 access token
   * @throws 토큰 갱신 실패 시 에러
   */
  static async refreshToken(): Promise<string> {
    // 서버/클라이언트 환경 감지
    if (typeof window === 'undefined') {
      // 서버 사이드
      return this.refreshTokenServer();
    } else {
      // 클라이언트 사이드
      return this.refreshTokenClient();
    }
  }

  /**
   * 서버 사이드에서 토큰을 갱신합니다.
   * Next.js 서버 컴포넌트/액션에서 사용됩니다.
   *
   * @private
   * @returns 갱신된 access token
   * @throws 토큰 갱신 실패 시 에러
   */
  private static async refreshTokenServer(): Promise<string> {
    // 동적 import로 서버 사이드에서만 cookies 사용
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        cookie: `${REFRESH_TOKEN_NAME}=${refreshToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    const data = await response.json();

    // NestJS ResponseInterceptor로 래핑된 응답에서 data 추출
    const responseData = data.data || data;

    // 다양한 응답 형식 지원
    const accessToken = responseData.accessToken || responseData.tkn || responseData.access_token;

    if (!accessToken) {
      throw new Error('No access token in refresh response');
    }

    return accessToken;
  }

  /**
   * 클라이언트 사이드에서 토큰을 갱신합니다.
   * 브라우저 환경에서 axios를 사용합니다.
   *
   * @private
   * @returns 갱신된 access token
   * @throws 토큰 갱신 실패 시 에러
   */
  private static async refreshTokenClient(): Promise<string> {
    const refreshInstance = axios.create({
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    const response = await refreshInstance.post('/auth/refresh', {});

    // axios는 이미 response.data로 파싱됨
    const data = response.data;

    // 다양한 응답 형식 지원
    const accessToken = data.accessToken || data.tkn || data.access_token;

    if (!accessToken) {
      throw new Error('No access token in refresh response');
    }

    return accessToken;
  }

  /**
   * 인증 에러(401, 403)를 처리합니다.
   *
   * @param error - HTTP 에러 객체 (status 또는 response.status 포함)
   * @returns 재시도 가능 여부 (true: 재시도 가능, false: 재시도 불가)
   */
  static async handleAuthError(error: { status?: number; response?: { status?: number } }): Promise<boolean> {
    const status = error.status || error.response?.status;

    // 401: Unauthorized - 토큰 갱신 시도
    if (status === 401) {
      try {
        await this.refreshToken();
        return true; // 재시도 가능
      } catch {
        // 토큰 갱신 실패 시 로그아웃
        this.logout();
        return false;
      }
    }

    // 403: Forbidden - 즉시 로그아웃
    if (status === 403) {
      this.logout();
      return false;
    }

    // 그 외 에러는 처리하지 않음
    return false;
  }

  /**
   * 로그아웃 처리를 수행합니다.
   *
   * - localStorage와 sessionStorage를 클리어합니다.
   * - 로그인 페이지로 리다이렉트합니다.
   *
   * 클라이언트 사이드에서만 동작합니다.
   */
  static logout(): void {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === 'undefined') {
      return;
    }

    // 스토리지 클리어
    LocalStorageUtil.clear();
    SessionStorageUtil.clear();

    // 로그인 페이지로 리다이렉트
    alert('로그인 세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
    window.location.href = '/auth/login';
  }
}
