import { LocalStorageUtil, SessionStorageUtil } from '@/utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_URL } from '@/shared/constant/api-url';

interface IReq {
  url: string;
  headers?: AxiosRequestConfig['headers'];
}

interface IGetReq<D> extends IReq {
  params?: D | null;
}

interface IPostReq<D> extends IReq {
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
      return response;
    },
    async (error) => {
      if (error.status === 302) {
        // const { redirect } = error.response.data;
        // window.location.href = redirect;
      }

      if (error.status === 400) {
        // const { message } = error.response.data;
        // if (message) {
        //   alert(message);
        // }
      }

      if (error.status === 401) {
        const refreshInstance = axios.create({
          baseURL: API_URL,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        try {
          await refreshInstance.post('/auth/refresh', {});

          const originalRequest = error.config;

          return axiosInstance(originalRequest);
        } catch (err: any) {
          if (err.status === 403) {
            LocalStorageUtil.clear();
            SessionStorageUtil.clear();

            alert('로그인 세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
            window.location.href = '/auth/login';
          }
        }
      }

      if (error.status === 403) {
        LocalStorageUtil.clear();
        SessionStorageUtil.clear();

        alert('로그인 세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/auth/login';
      }

      return Promise.reject(error);
    },
  );

  return {
    get: async <T, D>({ url, params, headers }: IGetReq<D>) => {
      return await axiosInstance.get<T>(url, { params, headers });
    },
    post: async <T, D>({ url, data, headers }: IPostReq<D>) => {
      return await axiosInstance.post<T>(url, data, { headers });
    },
    put: async <T, D>({ url, data, headers }: IPostReq<D>) => {
      return await axiosInstance.put<T>(url, data, { headers });
    },
    delete: async <T, D>({ url, params, headers }: IGetReq<D>) => {
      return await axiosInstance.delete<T>(url, { params, headers });
    },
    patch: async <T, D>({ url, data, headers }: IPostReq<D>) => {
      return await axiosInstance.patch<T>(url, data, { headers });
    },
  };
};

export default createAxiosInstance;
