'use server';

import { apiFetch } from '@/lib/fetch/fetch.config';

import { ResponseType } from '@/shared/types';

import { BoardModel } from '../model';

export const getBoardDetail = async (boardId: string): Promise<ResponseType<BoardModel | null>> => {
  try {
    // apiFetch가 자동으로 NestJS 응답에서 data를 추출
    const { board } = await apiFetch<{ board: BoardModel }>(`/board/${boardId}`);

    return { success: true, data: board };
  } catch {
    return { success: false, data: null };
  }
};
