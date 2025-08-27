import { StockCategoryEnum } from '@/shared/enum/stock';

export interface IGetStockKoreanListDto {
  page: number;
  kind?: StockCategoryEnum;
  text?: string;
}
