'use server';

import { API_URL } from '@/shared/constant/api-url';
import { IResponseType } from '@/shared/types';

import { IStockCategoryModel } from '../model';

export const stockCategoryListAction = async (): Promise<IResponseType<IStockCategoryModel[] | null>> => {
  const response = await fetch(`${API_URL}/stock/category`, {
    next: {
      revalidate: 3600, // 1 hour
      tags: ['stock-category-list'],
    },
  });

  if (!response.ok) {
    return { success: false, data: null };
  }

  const { stockCategoryList } = await response.json();

  return { success: true, data: stockCategoryList };
};
