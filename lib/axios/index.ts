import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { TokenManager } from '@/lib/auth/token-manager';

import { API_URL } from '@/shared/constant/api-url';

interface Req {
  url: string;
  headers?: AxiosRequestConfig['headers'];
}

interface GetReq<D> extends Req {
  params?: D | null;
}

interface PostReq<D> extends Req {
  data?: D | null;
}

const createAxiosInstance = (headers: AxiosRequestConfig['headers'] = {}) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json', ...headers },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      // const accessToken = LocalStorageUtil.getItem('__xt');

      // if (accessToken) {
      //   if (config.headers) {
      //     config.headers['Authorization'] = `Bearer ${accessToken}`;
      //   }
      // }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // NestJS ResponseInterceptor로 감싸진 응답에서 data 추출
      // { success, timestamp, path, statusCode, data } 형식에서 data만 추출
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        response.data = response.data.data;
      }
      return response;
    },
    async (error) => {
      // TokenManager를 사용한 통합 인증 에러 처리
      const shouldRetry = await TokenManager.handleAuthError(error);

      if (shouldRetry) {
        // 401 에러에서 토큰 갱신 성공 시 원래 요청 재시도
        const originalRequest = error.config;
        return axiosInstance(originalRequest);
      }

      // 재시도 불가능한 경우 에러 전파
      return Promise.reject(error);
    },
  );

  return {
    get: async <T, D>({ url, params, headers }: GetReq<D>) => {
      return await axiosInstance.get<T>(url, { params, headers });
    },
    post: async <T, D>({ url, data, headers }: PostReq<D>) => {
      return await axiosInstance.post<T>(url, data, { headers });
    },
    put: async <T, D>({ url, data, headers }: PostReq<D>) => {
      return await axiosInstance.put<T>(url, data, { headers });
    },
    delete: async <T, D>({ url, params, headers }: GetReq<D>) => {
      return await axiosInstance.delete<T>(url, { params, headers });
    },
    patch: async <T, D>({ url, data, headers }: PostReq<D>) => {
      return await axiosInstance.patch<T>(url, data, { headers });
    },
  };
};

export default createAxiosInstance;
