import { StockCategoryEnum } from '@/shared/enum/stock';

export interface IStockListDto {
  kind?: StockCategoryEnum;
  text?: string;
}
