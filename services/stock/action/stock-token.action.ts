'use server';

import { revalidateTag, unstable_cache } from 'next/cache';

import KY from '@/lib/ky';

import { IStockTokenRes } from '@/services/stock';

import { API_URL } from '@/shared/constant/api-url';

// const getCachedStockToken = unstable_cache(
//   async () => {
//     const ret = await KY.get<IStockTokenRes>(`${API_URL}/stock/token`).json();
//     return ret;
//   },
//   ['stock-token'], // 캐시 키
//   {
//     revalidate: 3600, // 1시간마다 재검증
//     tags: ['stock-token'], // 태그 기반 무효화용
//   },
// );

// export const getStockToken = async () => {
//   try {
//     const data = await getCachedStockToken();

//     return { success: true, data };
//   } catch (error) {
//     return { success: false, data: null };
//   }
// };

// export const revalidateStockToken = async () => {
//   revalidateTag('stock-token');
// };

export const getStockToken = async () => {
  try {
    const { token } = await KY.get<IStockTokenRes>(`${API_URL}/stock/token`).json();

    return { success: true, data: token };
  } catch (error) {
    return { success: false, data: null };
  }
};
