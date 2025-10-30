'use server';

import { API_URL } from '@/shared/constant/api-url';
import { IResponseType } from '@/shared/types';

import { INoticeModel } from '../model';

export const noticeDetailAction = async (noticeId: string): Promise<IResponseType<INoticeModel | null>> => {
  try {
    const res = await fetch(`${API_URL}/notice/${noticeId}`);

    if (!res.ok) {
      return { success: false, data: null };
    }

    const json = await res.json();
    const { notice } = json;

    return { success: true, data: notice };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
