'use server';

import { getValidTokens } from '@/utils';
import { headers } from 'next/headers';

import { API_URL } from '@/shared/constant/api-url';
import { IResponseType } from '@/shared/types';

import { IInquiryModel } from '../model';

export const inquiryDetailAction = async (inquiryId: string): Promise<IResponseType<IInquiryModel | null>> => {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  try {
    const { cookieHeader } = await getValidTokens(cookie);

    const res = await fetch(`${API_URL}/inquiry/${inquiryId}`, {
      credentials: 'include',
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return { success: false, data: null };
    }

    const json = await res.json();
    const { inquiry } = json;

    return { success: true, data: inquiry };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
