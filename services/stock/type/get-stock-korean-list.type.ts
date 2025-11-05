import { StockCategoryEnum } from '@/shared/enum/stock';

import { StockKoreanCompanyModel } from '../model';

export interface GetStockKoreanListReq {
  page: number;
  kind?: StockCategoryEnum;
  text?: string;
}

export interface GetStockKoreanListRes {
  stockKoreanList: StockKoreanCompanyModel[];
  total: number;
  nextPage: number | null;
}
