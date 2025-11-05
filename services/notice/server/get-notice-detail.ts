'use server';

import { API_URL } from '@/shared/constant/api-url';
import { ERROR_CODE } from '@/shared/constant/error-code/error-code';
import { IResponseType } from '@/shared/types';

import { NoticeModel } from '../model';
import { GetNoticeDetailRes } from '../type/get-notice-detail.type';

export const getNoticeDetail = async (noticeId: string): Promise<IResponseType<NoticeModel | null>> => {
  try {
    const res = await fetch(`${API_URL}/notice/${noticeId}`);

    if (!res.ok) {
      return { success: false, data: null, code: ERROR_CODE.INTERNAL_ERROR };
    }

    const data = (await res.json()) as GetNoticeDetailRes;

    const { notice } = data;

    return { success: true, data: notice };
  } catch (error) {
    return { success: false, data: null, code: ERROR_CODE.INTERNAL_ERROR };
  }
};
