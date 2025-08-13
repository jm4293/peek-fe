import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { ILoginEmailDto } from '../dto';
import { ILoginRes } from '../response';

export const signinEmailAction = async (dto: ILoginEmailDto) => {
  try {
    const ret = await KY.post<ILoginRes>(`${API_URL}/auth/login`, {
      json: dto,
    }).json();

    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
};
