import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { IInquiryDetailRes } from '../response';

export const inquiryDetailAction = async (inquiryId: string) => {
  try {
    const { inquiry } = await KY.get<IInquiryDetailRes>(`${API_URL}/inquiry/${inquiryId}`).json();

    return { success: true, data: inquiry };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
