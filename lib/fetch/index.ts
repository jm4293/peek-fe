import { TokenManager } from '@/lib/auth/token-manager';

import { API_URL } from '@/shared/constant/api-url';

/**
 * NestJS ResponseInterceptor 응답 형식
 * @template T - 실제 데이터 타입
 */
interface NestJSResponse<T> {
  success: boolean;
  timestamp: string;
  path: string;
  statusCode: number;
  data: T;
}

/**
 * NestJS ResponseInterceptor로 래핑된 응답을 자동으로 언래핑하는 fetch 래퍼 함수
 *
 * 401/403 에러 발생 시 TokenManager를 통해 자동으로 처리합니다.
 * 401 에러의 경우 토큰 갱신 후 자동으로 재시도합니다.
 *
 * @template T - 반환될 데이터의 타입
 * @param url - API 엔드포인트 경로 (예: '/board/123')
 * @param options - fetch RequestInit 옵션
 * @param retryCount - 내부 재시도 카운터 (사용자가 직접 설정하지 않음)
 * @returns 언래핑된 데이터
 * @throws fetch 실패 시 에러
 *
 * @example
 * ```typescript
 * // 기본 사용
 * const board = await apiFetch<BoardModel>('/board/123');
 *
 * // 옵션과 함께 사용
 * const user = await apiFetch<UserModel>('/user', {
 *   credentials: 'include',
 *   headers: { cookie: `token=${token}` }
 * });
 * ```
 */
export const apiFetch = async <T>(url: string, options?: RequestInit, retryCount = 0): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {
      // TokenManager를 사용한 인증 에러 처리
      const shouldRetry = await TokenManager.handleAuthError({
        status: response.status,
        response,
      });

      // 401 에러에서 토큰 갱신 성공 시 재시도 (최대 1회)
      if (shouldRetry && retryCount === 0) {
        return apiFetch<T>(url, options, retryCount + 1);
      }

      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as NestJSResponse<T>;

    // NestJS ResponseInterceptor 형식에서 data 필드만 추출하여 반환
    return json.data;
  } catch (error) {
    throw error;
  }
};
