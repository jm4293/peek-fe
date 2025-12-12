import { TokenManager } from '@/lib/auth/token-manager';

import { API_URL } from '@/shared/constant/api-url';

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
 * 미들웨어가 대부분의 토큰 갱신을 처리하지만,
 * 미들웨어 이후 토큰이 만료된 경우를 대비한 백업 재시도 로직을 포함합니다.
 *
 * @template T - 반환될 데이터의 타입
 * @param url - API 엔드포인트 경로
 * @param options - fetch RequestInit 옵션
 * @param retryCount - 내부 재시도 카운터 (사용자가 직접 설정하지 않음)
 * @returns 언래핑된 데이터
 * @throws fetch 실패 시 에러
 */
export const apiFetch = async <T>(url: string, options?: RequestInit, retryCount = 0): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {
      // 미들웨어가 놓친 401 에러를 대비한 백업 재시도 로직
      if (response.status === 401 && retryCount === 0) {
        const shouldRetry = await TokenManager.handleAuthError({
          status: response.status,
          response,
        });

        if (shouldRetry) {
          // 토큰 갱신 성공 시 재시도
          return apiFetch<T>(url, options, retryCount + 1);
        }
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
