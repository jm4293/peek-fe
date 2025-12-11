import createAxiosInstance from '@/lib/axios/axios.config';

import {
  CheckEmailCodeReq,
  CheckEmailCodeRes,
  CheckEmailReq,
  CheckEmailRes,
  SignInEmailReq,
  SignInEmailRes,
  SignInOAuthReq,
  SignInOAuthRes,
  SignUpEmailReq,
  SignUpEmailRes,
} from '../type';
import { RefreshTokenRes } from '../type/refresh-token.type';

const axios = createAxiosInstance();
const baseURL = '/auth';

const authApi = {
  signInEmail: async (dto: SignInEmailReq) => {
    return await axios.post<SignInEmailRes, SignInEmailReq>({
      url: `${baseURL}/login`,
      data: dto,
    });
  },

  signInOauth: async (dto: SignInOAuthReq) => {
    return await axios.post<SignInOAuthRes, SignInOAuthReq>({
      url: `${baseURL}/login/oauth`,
      data: dto,
    });
  },

  checkEmail: async (dto: CheckEmailReq) => {
    return await axios.post<CheckEmailRes, CheckEmailReq>({
      url: `${baseURL}/check-email`,
      data: dto,
    });
  },

  checkEmailCode: async (dto: CheckEmailCodeReq) => {
    return await axios.post<CheckEmailCodeRes, CheckEmailCodeReq>({
      url: `${baseURL}/check-email-code`,
      data: dto,
    });
  },

  signUp: async (dto: SignUpEmailReq) => {
    return await axios.post<SignUpEmailRes, SignUpEmailReq>({
      url: `${baseURL}/signup`,
      data: dto,
    });
  },

  logout: async () => {
    return await axios.post<{}, {}>({ url: `${baseURL}/logout`, data: {} });
  },

  refreshToken: async () => {
    return await axios.post<RefreshTokenRes, null>({
      url: `${baseURL}/refresh-token`,
      data: null,
    });
  },
};

export default authApi;
