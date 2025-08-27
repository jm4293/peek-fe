import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { IGetStockKoreanDto } from '../dto';
import { IStockKoreanRes } from '../response';

export const stockKoreanActions = async (dto: IGetStockKoreanDto) => {
  const { code } = dto;

  try {
    const { stockKorean } = await KY.get<IStockKoreanRes>(`${API_URL}/stock/korean/${code}`).json();

    return { success: true, data: stockKorean };
  } catch (error) {
    return { success: false, data: null };
  }
};
