'use server';

import { API_URL } from '@/shared/constant/api-url';
import { ResponseType } from '@/shared/types';

import { BoardModel } from '../model';

export const getBoardDetail = async (boardId: string): Promise<ResponseType<BoardModel | null>> => {
  try {
    const res = await fetch(`${API_URL}/board/${boardId}`);

    if (!res.ok) {
      return { success: false, data: null };
    }

    const json = await res.json();
    const { board } = json;

    return { success: true, data: board };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
