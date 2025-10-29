'use server';

import { ValidToken } from '@/utils';
import { cookies } from 'next/headers';

import { API_URL } from '@/shared/constant/api-url';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';
import { ERROR_CODE } from '@/shared/constant/error-code/error-code';
import { IResponseType } from '@/shared/types';

import { IUserAccountModel } from '../model';

export const userInfoAction = async (): Promise<IResponseType<IUserAccountModel>> => {
  const cookieStore = await cookies();

  const tkn = cookieStore.get(ACCESS_TOKEN_NAME);
  const rtkn = cookieStore.get(REFRESH_TOKEN_NAME);

  const validTkn = await ValidToken({ tkn: tkn?.value, rtkn: rtkn?.value });

  if (!validTkn) {
    return { success: false, data: null, code: ERROR_CODE.UNAUTHORIZED };
  }

  const response = await fetch(`${API_URL}/user`, {
    credentials: 'include',
    headers: {
      cookie: `${ACCESS_TOKEN_NAME}=${validTkn}`,
    },
  });

  if (!response.ok) {
    return { success: false, data: null, code: ERROR_CODE.INTERNAL_ERROR };
  }

  const data = await response.json();
  const { myInfo } = data;

  return { success: true, data: myInfo };
};
