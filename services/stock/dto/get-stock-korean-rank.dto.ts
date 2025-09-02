import { StockRankEnum } from '@/shared/enum/stock';

export interface IGetStockKoreanRankDto {
  page: number;
  type: StockRankEnum;
}
