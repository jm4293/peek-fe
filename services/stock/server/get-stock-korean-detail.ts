'use server';

import { API_URL } from '@/shared/constant/api-url';
import { IResponseType } from '@/shared/types';

import { StockKoreanModel } from '../model/stock-korean.model';
import { GetStockKoreanDetailReq } from '../type';

export const getStockKoreanDetail = async (
  dto: GetStockKoreanDetailReq,
): Promise<IResponseType<StockKoreanModel | null>> => {
  const { code } = dto;

  try {
    const res = await fetch(`${API_URL}/stock/korean/detail/${code}`);

    if (!res.ok) {
      return { success: false, data: null };
    }

    const json = await res.json();
    const { stockKorean } = json;

    return { success: true, data: stockKorean };
  } catch (error) {
    return { success: false, data: null };
  }
};
