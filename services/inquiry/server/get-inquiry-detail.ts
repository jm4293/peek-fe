'use server';

import { getOrRefreshAccessToken } from '@/utils';
import { cookies } from 'next/headers';

import { apiFetch } from '@/lib/fetch/fetch.config';

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';
import { ERROR_CODE } from '@/shared/constant/error-code/error-code';
import { ResponseType } from '@/shared/types';

import { InquiryModel } from '../model';

export const getInquiryDetail = async (inquiryId: string): Promise<ResponseType<InquiryModel | null>> => {
  const cookieStore = await cookies();

  const tkn = cookieStore.get(ACCESS_TOKEN_NAME);
  const rtkn = cookieStore.get(REFRESH_TOKEN_NAME);

  try {
    const validTkn = await getOrRefreshAccessToken(tkn?.value, rtkn?.value);

    if (!validTkn) {
      return { success: false, data: null, code: ERROR_CODE.UNAUTHORIZED };
    }

    // apiFetch가 자동으로 NestJS 응답에서 data를 추출
    const { inquiry } = await apiFetch<{ inquiry: InquiryModel }>(`/inquiry/${inquiryId}`, {
      credentials: 'include',
      headers: {
        cookie: `${ACCESS_TOKEN_NAME}=${validTkn}`,
      },
    });

    return { success: true, data: inquiry };
  } catch {
    return { success: false, data: null };
  }
};
