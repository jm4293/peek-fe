'use server';

import { API_URL } from '@/shared/constant/api-url';

import { IGetStockKoreanDto } from '../dto';
import { IStockKoreanModel } from '../model';

export const stockKoreanDetailAction = async (
  dto: IGetStockKoreanDto,
): Promise<{ success: boolean; data: IStockKoreanModel | null }> => {
  const { code } = dto;

  try {
    const res = await fetch(`${API_URL}/stock/korean/detail/${code}`);

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const json = await res.json();
    const { stockKorean } = json;

    return { success: true, data: stockKorean };
  } catch (error) {
    return { success: false, data: null };
  }
};
