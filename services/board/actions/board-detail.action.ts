'use server';

import { API_URL } from '@/shared/constant/api-url';

import { IBoardModel } from '../model';

export const boardDetailAction = async (boardId: string): Promise<{ success: boolean; data: IBoardModel | null }> => {
  try {
    const res = await fetch(`${API_URL}/board/${boardId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const json = await res.json();
    const { board } = json;

    return { success: true, data: board };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
