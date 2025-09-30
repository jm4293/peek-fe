'use server';

import { API_URL } from '@/shared/constant/api-url';

export const stockCategoryListAction = async () => {
  try {
    const res = await fetch(`${API_URL}/stock/category`);

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const { stockCategoryList } = await res.json();

    if (!stockCategoryList) {
      throw new Error('No stock category list');
    }

    return { success: true, data: stockCategoryList };
  } catch (error: unknown) {
    return { success: false, data: null };
  }
};
