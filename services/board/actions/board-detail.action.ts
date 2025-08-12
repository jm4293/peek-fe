import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { IBoardDetailRes } from '../response';

export const boardDetailAction = async (boardId: string) => {
  try {
    const ret = await KY.get<IBoardDetailRes>(`${API_URL}/board/${boardId}`).json();

    return { success: true, data: ret };
  } catch (error: unknown) {
    return {
      success: false,
    };
  }
};
