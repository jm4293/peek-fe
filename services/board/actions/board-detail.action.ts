'use server';

import { API_URL } from '@/shared/constant/api-url';
import { IResponseType } from '@/shared/types';

import { IBoardModel } from '../model';

export const boardDetailAction = async (boardId: string): Promise<IResponseType<IBoardModel | null>> => {
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
