'use server';

import { getValidTokens } from '@/utils';
import { headers } from 'next/headers';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { IInquiryDetailRes } from '../response';

export const inquiryDetailAction = async (inquiryId: string) => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  try {
    const { cookieHeader } = await getValidTokens(cookie);

    const { inquiry } = await KY.get<IInquiryDetailRes>(`${API_URL}/inquiry/${inquiryId}`, {
      headers: {
        cookie: cookieHeader,
      },
    }).json();

    return { success: true, data: inquiry };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
