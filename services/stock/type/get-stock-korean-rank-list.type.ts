import { StockRankEnum } from '@/shared/enum/stock';

import { StockKoreanCompanyModel } from '../model';

export interface GetStockKoreanRankListReq {
  page: number;
  type: StockRankEnum;
}

export interface GetStockKoreanRankListRes {
  stockKoreanList: StockKoreanCompanyModel[];
  total: number;
  nextPage: number | null;
}
