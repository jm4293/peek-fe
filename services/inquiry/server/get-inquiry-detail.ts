'use server';

import { getValidTokens } from '@/utils';
import { headers } from 'next/headers';

import { apiFetch } from '@/lib/fetch';

import { ResponseType } from '@/shared/types';

import { InquiryModel } from '../model';

export const getInquiryDetail = async (inquiryId: string): Promise<ResponseType<InquiryModel | null>> => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  try {
    const { cookieHeader } = await getValidTokens(cookie);

    // apiFetch가 자동으로 NestJS 응답에서 data를 추출
    const { inquiry } = await apiFetch<{ inquiry: InquiryModel }>(`/inquiry/${inquiryId}`, {
      credentials: 'include',
      headers: {
        cookie: cookieHeader,
      },
    });

    return { success: true, data: inquiry };
  } catch {
    return { success: false, data: null };
  }
};
