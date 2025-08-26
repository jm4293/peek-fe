import { StockCategoryEnum } from '@/shared/enum/stock';

export interface IGetCodeKoreanListDto {
  // page: number;
  kind?: StockCategoryEnum;
  text?: string;
}
