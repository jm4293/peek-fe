'use server';

import { apiFetch } from '@/lib/fetch/fetch.config';

import { ERROR_CODE } from '@/shared/constant/error-code/error-code';
import { ResponseType } from '@/shared/types';

import { NoticeModel } from '../model';
import { GetNoticeDetailRes } from '../type/get-notice-detail.type';

export const getNoticeDetail = async (noticeId: string): Promise<ResponseType<NoticeModel | null>> => {
  try {
    // apiFetch가 자동으로 NestJS 응답에서 data를 추출
    const { notice } = await apiFetch<GetNoticeDetailRes>(`/notice/${noticeId}`);

    return { success: true, data: notice };
  } catch {
    return { success: false, data: null, code: ERROR_CODE.INTERNAL_ERROR };
  }
};
