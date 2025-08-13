'use server';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { IBoardDetailRes } from '../response';

export const boardDetailAction = async (boardId: string) => {
  try {
    const { board } = await KY.get<IBoardDetailRes>(`${API_URL}/board/${boardId}`).json();

    return { success: true, data: board };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
