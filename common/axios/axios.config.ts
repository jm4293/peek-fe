import { LocalStorage, SessionStorage } from '@/utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import AuthApi from '@/api/auth/auth.api';

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

export class AxiosConfig {
  private readonly _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`,
      // baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    this._axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = LocalStorage.getItem('__xt__');

        if (accessToken) {
          if (config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
        }

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
        if (error.response?.status === 302) {
          const { redirect } = error.response.data;

          // window.location.href = redirect;
        }

        if (error.response?.status === 400) {
          // const { message } = error.response.data;
          // if (message) {
          //   alert(message);
          // }
        }

        if (error.response?.status === 401) {
          const ret = await AuthApi.refreshToken();

          const newAccessToken = ret.data.accessToken;

          LocalStorage.setItem('__xt__', newAccessToken);

          const originalRequest = error.config;

          return this._axiosInstance(originalRequest);
        }

        if (error.response?.status === 403) {
          LocalStorage.clear();
          SessionStorage.clear();
          // window.location.replace('/home');
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
