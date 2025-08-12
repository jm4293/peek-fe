import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { ILoginEmailDto } from '../dto';
import { ILoginRes } from '../response';

export const signinEmailAction = async (dto: ILoginEmailDto) => {
  try {
    const ret = await KY.post<ILoginRes>(`${API_URL}/auth/login`, {
      json: dto,
    }).json();

    return { success: true, data: ret };
  } catch (error: unknown) {
    return {
      success: false,
      message: error?.message || '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
