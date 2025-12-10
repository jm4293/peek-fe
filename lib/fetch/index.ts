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
 * @template T - 반환될 데이터의 타입
 * @param url - API 엔드포인트 경로 (예: '/board/123')
 * @param options - fetch RequestInit 옵션
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
export const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as NestJSResponse<T>;

  // NestJS ResponseInterceptor 형식에서 data 필드만 추출하여 반환
  return json.data;
};
