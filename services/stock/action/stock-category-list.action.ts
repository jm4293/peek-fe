import KY from '@/lib/ky';

import { IStockCategoryListRes } from '@/services/stock';

import { API_URL } from '@/shared/constant/api-url';

export const stockCategoryListAction = async () => {
  try {
    const ret = await KY.get<IStockCategoryListRes>(`${API_URL}/stock/category`).json();

    return { success: true, data: ret };
  } catch (error: unknown) {
    return {
      success: false,
    };
  }
};
