import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { INoticeDetailRes } from '../response';

export const noticeDetailAction = async (noticeId: string) => {
  try {
    const { notice } = await KY.get<INoticeDetailRes>(`${API_URL}/notice/${noticeId}`).json();

    return { success: true, data: notice };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
