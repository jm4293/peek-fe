import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_URL } from '@/shared/constant/api-url';

import { LocalStorage } from '@/utils/localStorage';
import { SessionStorage } from '@/utils/sessionStorage';

interface IReq {
  url: string;
  headers?: AxiosRequestConfig['headers'];
}

interface IGetReq<D> extends IReq {
  params?: D;
}

interface IPostReq<D> extends IReq {
  data: D;
}

export default class AXIOS {
  private readonly _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    this._axiosInstance.interceptors.request.use(
      (config) => {
        // const accessToken = LocalStorage.getItem('__xt');

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

    this._axiosInstance.interceptors.response.use(
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
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });

          try {
            await refreshInstance.post('/auth/refresh', {});

            const originalRequest = error.config;

            return this._axiosInstance(originalRequest);
          } catch (err: any) {
            if (err.status === 403) {
              LocalStorage.clear();
              SessionStorage.clear();

              alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
              window.location.href = '/home';
            }
          }
        }

        if (error.status === 403) {
          LocalStorage.clear();
          SessionStorage.clear();

          alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
          window.location.href = '/home';
        }

        return Promise.reject(error);
      },
    );
  }

  protected async get<T, D>({ url, params, headers }: IGetReq<D>) {
    return await this._axiosInstance.get<T>(url, { params, headers });
  }

  protected async post<T, D>({ url, data, headers }: IPostReq<D>) {
    return await this._axiosInstance.post<T>(url, data, { headers });
  }

  protected async put<T, D>({ url, data, headers }: IPostReq<D>) {
    return await this._axiosInstance.put<T>(url, data, { headers });
  }

  protected async delete<T, D>({ url, params, headers }: IGetReq<D>) {
    return await this._axiosInstance.delete<T>(url, { params, headers });
  }

  protected async patch<T, D>({ url, data, headers }: IPostReq<D>) {
    return await this._axiosInstance.patch<T>(url, data, { headers });
  }
}
